<template>
  <div class="p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-bold">{{ $t('navbar.manageProducts') }}</h1>

    <input
      v-model="searchText"
      type="text"
      placeholder="Search product..."
      class="input-style w-full flex-grow mt-5"
    />
    <div class="flex items-center justify-between space-x-4 my-5">
      <div class="flex items-center space-x-4 flex-grow">
        <multiselect
          v-model="selectedCategory"
          :options="categories"
          :searchable="true"
          placeholder="Filter by category"
          :label="$i18n.locale"
          :track-by="'id'"
          :selectLabel="''"
          class="w-1/4 flex-grow"
        ></multiselect>
        <multiselect
          v-model="selectedTag"
          :options="tags"
          :searchable="true"
          placeholder="Filter by tag"
          :label="$i18n.locale"
          :track-by="'id'"
          :selectLabel="''"
          class="w-1/4 flex-grow"
        ></multiselect>
      </div>
      <button
        @click="toggleForm"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 flex items-center space-x-2 transition duration-300"
      >
        <plusIcon class="w-5 h-5 text-white" />
        <span>{{ $t('button.productForm.addProduct') }}</span>
      </button>
    </div>

    <!-- Show product list -->
    <div class="overflow-x-auto">
      <ProductList :products="filteredProducts" @edit="handleEditProduct" @delete="handleDeleteProduct" />
    </div>

    <!-- Form for adding/editing products -->
    <transition name="fade" mode="out-in">
      <div v-if="showForm" class="fixed inset-0 mt-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
        <div class="bg-white py-6 rounded-lg shadow-lg z-50 w-full max-w-md">
          <ProductForm
            :editProduct="productToEdit" 
            @addProduct="handleAddProduct" 
            @updateProduct="handleUpdateProduct" 
            @cancelForm="showCancelConfirmation = true" 
          />
        </div>
      </div>
    </transition>

    <!-- Modal Confirm cancellation -->
    <transition name="fade" mode="out-in">
      <div v-if="showCancelConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-sm">
          <h3 class="text-center mb-4 text-2xl font-medium">{{ $t('alert.confirmCancel.header') }}</h3>
          <p class="text-center mb-4">{{ $t('alert.confirmCancel.detail') }}</p>
          <div class="flex justify-center space-x-4">
            <button @click="confirmCancel" class="bg-red-600 text-white px-4 py-2 rounded-lg">
              {{ $t('button.yes') }}
            </button>
            <button @click="showCancelConfirmation = false" class="bg-gray-400 text-white px-4 py-2 rounded-lg">
              {{ $t('button.no') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ProductList from '~/components/ProductList.vue';
import ProductForm from '~/components/ProductForm.vue';
import Multiselect from 'vue-multiselect';
import plusIcon from '~/assets/icon/plus.svg';

export default {
  components: {
    ProductList,
    ProductForm,
    plusIcon,
    Multiselect,
  },
  data() {
    return {
      products: [],
      categories: [],
      tags: [],
      searchText: '',
      selectedCategory: null,
      selectedTag: null,
      showForm: false,
      showCancelConfirmation: false,
      productToEdit: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchText = product.name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchCategory = this.selectedCategory
          ? product.category.id === this.selectedCategory.id
          : true;
        const matchTag = this.selectedTag
          ? product.tags.some((tag) => tag.id === this.selectedTag.id)
          : true;

        return matchText && matchCategory && matchTag;
      });
    },
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      this.showCancelConfirmation = false;
    },
    confirmCancel() {
      this.showForm = false;
      this.showCancelConfirmation = false;
      this.productToEdit = null;
    },
    handleAddProduct(newProduct) {
      this.products.push(newProduct);
      this.showForm = false;
    },
    handleUpdateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => p._id === updatedProduct._id);
      if (index !== -1) this.products.splice(index, 1, updatedProduct);
      this.showForm = false;
      this.productToEdit = null;
    },
    handleDeleteProduct(productId) {
      this.products = this.products.filter((product) => product._id !== productId);
    },
    handleEditProduct(product) {
      this.productToEdit = { ...product };
      this.showForm = true;
    },
    async fetchData() {
      try {
        const [productRes, categoryRes, tagRes] = await Promise.all([
          this.$axios.$get('/products'),
          this.$axios.$get('/categories'),
          this.$axios.$get('/tags'),
        ]);

        this.products = productRes;
        this.categories = categoryRes.map((cat) => ({ ...cat, id: cat._id, ...cat.name }));
        this.tags = tagRes.map((tag) => ({ ...tag, id: tag._id, ...tag.name }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.input-style {
  @apply border border-gray-300 rounded-md px-3 py-2 focus:outline-none;
}
</style>
