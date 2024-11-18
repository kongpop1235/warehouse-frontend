<template>
  <div>
    <h1 class="text-2xl font-bold">{{ $t('navbar.manageProducts') }}</h1>
    <!-- Button for opening the add product form -->
    <button @click="toggleForm" class="bg-[#1660f8] text-white my-7.5 px-4 py-2 rounded-lg flex items-center space-x-2">
      <plusIcon class="w-5 h-5 text-current" />
      {{ $t('button.productForm.addProduct') }}
    </button>

    <!-- Show product list -->
    <ProductList :products="products" @edit="handleEditProduct" @delete="handleDeleteProduct" />

    <!-- Form for adding/editing products -->
    <transition name="fade" mode="out-in">
      <div v-if="showForm" class="fixed inset-0 mt-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
        <div class="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
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
import plusIcon from '~/assets/icon/plus.svg';

export default {
  components: {
    ProductList,
    ProductForm,
    plusIcon
  },
  data() {
    return {
      products: [],
      showForm: false,
      showCancelConfirmation: false,
      productToEdit: null,
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      this.showCancelConfirmation = false;
    },
    confirmCancel() {
      this.showForm = false
      this.showCancelConfirmation = false
      if (!this.showForm) this.productToEdit = null;
    },
    handleAddProduct(newProduct) {
      this.products.push(newProduct);
      this.showForm = false;
    },
    handleUpdateProduct(updatedProduct) {
      const index = this.products.findIndex(p => p._id === updatedProduct._id);
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
      this.showForm = false;
      this.productToEdit = null;
    },
    handleDeleteProduct(productId) {
      this.products = this.products.filter(product => product._id !== productId);
    },
    handleEditProduct(product) {
      this.productToEdit = { ...product };
      this.showForm = true;
    },
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('/products')
      this.products = response
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
}
</script>

<style scoped>
</style>
