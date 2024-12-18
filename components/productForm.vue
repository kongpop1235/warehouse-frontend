<template>
  <div class="m-0">
    <h2 class="text-2xl font-semibold mx-6 mb-6">{{ isEdit ? $t('productForm.editTitle') : $t('productForm.addTitle') }}</h2>
    <hr/>
    <form @submit.prevent="submitForm" class="max-h-[500px] overflow-y-auto custom-scrollbar mx-6 pr-1">
      <div class="mb-4 mt-2">
        <p class="mb-1">{{ $t('productForm.name') }}</p>
        <input v-model="product.name" type="text" required maxlength="255" class="input-style" />
      </div>
      <div class="mb-4">
        <p class="mb-1">{{ $t('productForm.description') }}</p>
        <textarea v-model="product.description" maxlength="1000" class="input-style"></textarea>
      </div>

      <!-- Category Select -->
      <div class="mb-4">
        <p class="mb-1">{{ $t('productForm.category') }}</p>
        <multiselect
          v-model="product.category"
          :options="categoriesWithAddOption"
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select or add a category"
          @select="handleCategorySelection"
        >
          <template #singleLabel="{ option }">
            <span>{{ option[$i18n.locale] }}</span>
          </template>
          <template #option="{ option }">
            <div v-if="option === 'Add New Category'" class="flex items-center">
              <plusIcon class="w-5 h-5 mr-2" />
              <span>{{ $t('productForm.addNewCategory') }}</span>
            </div>
            <div v-else>{{ option[$i18n.locale] }}</div>
          </template>
        </multiselect>
      </div>

      <!-- Tags Select -->
      <div class="mb-4">
        <p class="mb-1">{{ $t('productForm.tags') }}</p>
        <multiselect
          v-model="tagsSelect"
          :options="tagsWithAddOption"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
          :show-labels="false"
          :label="$i18n.locale"
          placeholder="Select or add a tag"
          track-by="id"
          @select="handleTagSelection"
        >
          <template #option="{ option }">
            <div v-if="option === 'Add New Tag'" class="flex items-center">
              <plusIcon class="w-5 h-5 mr-2" />
              <span>{{ $t('productForm.addNewTags') }}</span>
            </div>
            <div v-else>{{ option[$i18n.locale] }}</div>
          </template>
        </multiselect>
      </div>

      <div class="mb-7">
        <p class="mb-1">{{ $t('productForm.price') }}</p>
        <input v-model.number="product.price" type="number" required min="0" class="input-style" />
      </div>
      <div class="mb-7 relative">
        <p class="mb-1">{{ $t('productForm.discountPrice') }}</p>
        <input 
          v-model.number="product.discountPrice" 
          type="number" 
          :max="product.price" 
          min="0" 
          class="input-style" 
        />
        <transition name="fade">
          <p v-if="product.discountPrice > product.price || product.discountPrice < 0" 
             class="text-red-500 text-sm absolute top-full mt-1">
            {{ $t('productForm.invalidDiscountPrice') }}
          </p>
        </transition>
      </div>
      <div class="mb-7 relative">
        <p class="mb-1">{{ $t('productForm.discountPercentage') }}</p>
        <input 
          v-model.number="product.discountPercentage" 
          type="number" 
          step="0.01" 
          min="0" 
          max="100" 
          class="input-style" 
        />
        <transition name="fade">
          <p v-if="product.discountPercentage < 0 || product.discountPercentage > 100" class="text-red-500 text-sm absolute top-full mt-1">
            {{ $t('productForm.invalidDiscountPercentage') }}
          </p>
        </transition>
      </div>
      <div class="mb-7">
        <p class="mb-1">{{ $t('productForm.stockQuantity') }}</p>
        <input v-model.number="product.stockQuantity" type="number" required min="0" class="input-style" />
      </div>
      <div class="mb-7">
        <p class="mb-1">{{ $t('productForm.supplier') }}</p>
        <multiselect
          v-model="product.supplier"
          :options="activeSuppliers"
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select a supplier"
        >
          <template #singleLabel="{ option }">
            <span>{{ option.name }}</span>
          </template>
          <template #option="{ option }">
            <div>{{ option.name }}</div>
          </template>
        </multiselect>
      </div>
      <div class="mb-7">
        <p class="mb-1">{{ $t('productForm.costPrice') }}</p>
        <input v-model.number="product.costPrice" type="number" required min="0" class="input-style" />
      </div>
      <div class="mb-7">
        <p class="mb-1">{{ $t('productForm.productURL') }}</p>
        <input v-model="product.productURL" type="text" maxlength="500" class="input-style" />
      </div>
      <div>
        <p class="mb-1">{{ $t('productForm.internalNotes') }}</p>
        <textarea v-model="product.internalNotes" maxlength="500" class="input-style"></textarea>
      </div>

      <div class="flex justify-center space-x-7.5">
        <button class="bg-[#1660f8] text-white px-4 py-2 rounded-lg mt-4" type="submit">
          {{ isEdit ? $t('productForm.update') : $t('productForm.addProduct') }}
        </button>
        <button @click="$emit('cancelForm')" class="bg-red-600 text-white px-4 py-2 rounded-lg mt-4" type="button">
          {{ $t('button.cancel') }}
        </button>
      </div>
    </form>

    <!-- Modal adding new Category -->
    <categoryForm
      :show="showAddcategoryForm"
      :mode="'add'"
      @categoryAdded="handleCategoryAdded"
      @close="showAddcategoryForm = false"
    />
    <!-- Add/Edit Tag Modal -->
    <tagForm
      :show="showAddTagsModal"
      :mode="'add'"
      @tagAdded="handleTagAdded"
      @close="showAddTagsModal = false"
    />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import plusIcon from '~/assets/icon/plus.svg'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import categoryForm from '~/components/categoryForm.vue';
import tagForm from '~/components/tagForm.vue';

export default {
  components: {
    plusIcon,
    Multiselect,
    categoryForm,
    tagForm
  },
  props: ['editProduct'],
  data() {
    return {
      product: this.editProduct || {
        name: '',
        description: '',
        category: '',
        tags: [],
        price: 0,
        discountPrice: 0,
        discountPercentage: 0,
        stockQuantity: 0,
        supplier: '',
        costPrice: 0,
        productURL: '',
        internalNotes: '',
      },
      isEdit: !!this.editProduct,
      categories: [],
      tags: [],
      suppliers: [], // Add supplier data array
      activeSuppliers: [], // Only active suppliers
      showAddcategoryForm: false,
      showAddTagsModal: false,
      tagsSelect: [],
    };
  },
  computed: {
    categoriesWithAddOption() {
      return ['Add New Category', ...this.categories];
    },
    tagsWithAddOption() {
      return ['Add New Tag', ...this.tags];
    },
  },
  watch: {
    editProduct: {
      handler(newValue) {
        this.product = newValue || {
          name: '',
          description: '',
          category: '',
          tags: [],
          price: 0,
          discountPrice: 0,
          discountPercentage: 0,
          stockQuantity: 0,
          supplier: '',
          costPrice: 0,
          productURL: '',
          internalNotes: '',
        };
        if (newValue && newValue.tags) {
          this.tagsSelect = newValue.tags.map(tag => ({
            en: tag.en,
            th: tag.th,
            id: tag.id,
          }));
        } else {
          this.tagsSelect = [];
        }

        this.isEdit = !!newValue;
      },
      immediate: true,
    },
  },
  methods: {
    handleCategorySelection(value) {
      if (value === 'Add New Category') {
        this.showAddcategoryForm = true;
        this.product.category = '';
      }
    },
    handleTagSelection(value) {
      if (value === 'Add New Tag') {
        this.showAddTagsModal = true;
        this.tagsSelect.pop();
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/categories');
        this.categories = response.data.map(category => ({"en": category.name.en, "th": category.name.th, "id": category._id}));//Update categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchTags() {
      try {
        const response = await this.$axios.get('/tags');
        this.tags = response.data.map(tag => ({"en": tag.name.en, "th": tag.name.th, "id": tag._id})); // Update tags
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },
    async fetchSuppliers() {
      try {
        const response = await this.$axios.get('/suppliers/ids-name-status');
        this.suppliers = response.data;
        this.activeSuppliers = this.suppliers.filter(supplier => supplier.status === 'Active');
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    },
    async submitForm() {
      this.product.tags = this.tagsSelect.filter(tag => tag.id).map(tag => tag.id);
      this.product.category = this.product.category.id;
      this.product.supplier = this.product.supplier._id; // Save supplier ID
      let response;
      try {
        if (this.isEdit) {
          response = await this.$axios.put(`/products/${this.product._id}`, this.product);
          this.$emit('updateProduct', response.data);
        } else {
          console.log(this.product)
          response = await this.$axios.post('/products', this.product);
          this.$emit('addProduct', response.data);
        }
      } catch (error) {
        console.error('Error submitting product:', error);
      }
    },
    handleCategoryAdded(category) {
      const tagsCategory = {"en": category.name.en, "th": category.name.th, "id": category._id};
      this.categories.push(tagsCategory);
      this.product.category = tagsCategory;
    },
    handleTagAdded(tag) {
      const tagsFormat = {"en": tag.name.en, "th": tag.name.th, "id": tag._id}
      this.tags.push(tagsFormat);
      this.tagsSelect.push(tagsFormat);
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchTags();
    this.fetchSuppliers();
  },
};

</script>

<style scoped>
.input-style {
  @apply border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-300 focus:border-blue-500;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.custom-scrollbar::-webkit-scrollbar-button {
  display: none;
}
</style>
