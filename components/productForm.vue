<template>
  <div>
    <h2 class="text-2xl font-semibold">{{ isEdit ? $t('productForm.editTitle') : $t('productForm.addTitle') }}</h2>
    <form @submit.prevent="submitForm" class="max-h-[500px] overflow-y-auto custom-scrollbar pr-5">
      <div>
        <label>{{ $t('productForm.name') }}</label>
        <input v-model="product.name" type="text" required maxlength="255" class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.description') }}</label>
        <textarea v-model="product.description" maxlength="1000" class="input-style"></textarea>
      </div>

      <!-- Category Select -->
      <div>
        <label>{{ $t('productForm.category') }}</label>
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
      <div>
        <label>{{ $t('productForm.tags') }}</label>
        <multiselect
          v-model="product.tags"
          :options="tagsWithAddOption"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
          :show-labels="false"
          :label="$i18n.locale"
          placeholder="Select or add a tag"
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

      <div>
        <label>{{ $t('productForm.price') }}</label>
        <input v-model="product.price" type="number" required class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.discountPrice') }}</label>
        <input v-model="product.discountPrice" type="number" class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.discountPercentage') }}</label>
        <input v-model="product.discountPercentage" type="number" step="0.01" min="0" max="100" class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.stockQuantity') }}</label>
        <input v-model="product.stockQuantity" type="number" required class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.supplier') }}</label>
        <input v-model="product.supplier" type="text" maxlength="255" class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.costPrice') }}</label>
        <input v-model="product.costPrice" type="number" required class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.productURL') }}</label>
        <input v-model="product.productURL" type="text" maxlength="500" class="input-style" />
      </div>
      <div>
        <label>{{ $t('productForm.internalNotes') }}</label>
        <textarea v-model="product.internalNotes" maxlength="500" class="input-style"></textarea>
      </div>

      <div class="flex justify-center space-x-7.5">
        <button class="bg-[#1660f8] text-white px-4 py-2 rounded-lg mt-4" type="submit">
          {{ isEdit ? $t('productForm.update') : $t('productForm.addProduct') }}
        </button>
        <button @click="$emit('cancelForm')" class="bg-red-600 text-white px-4 py-2 rounded-lg mt-4" type="button">
          {{ $t('botton.cancel') }}
        </button>
      </div>
    </form>

    <!-- Modal adding new Category -->
    <transition name="fade" mode="out-in">
      <div v-if="showAddCategoryModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
          <h3 class="mb-2">{{ $t('productForm.addCategory') }}</h3>
          <input v-model="newCategory.en" type="text" placeholder="EN" class="input-style mb-4" />
          <input v-model="newCategory.th" type="text" placeholder="TH" class="input-style mb-4" />
          <h3 class="mb-2">{{ $t('productForm.descriptionCategory') }}</h3>
          <textarea v-model="newCategoryDescription" maxlength="1000" class="input-style mb-3"></textarea>
          <div class="flex justify-end space-x-4">
            <button @click="addCategoryFromModal" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Add</button>
            <button @click="showAddCategoryModal = false" class="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal adding new tags -->
    <transition name="fade" mode="out-in">
      <div v-if="showAddTagsModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
          <h3 class="mb-2">{{ $t('productForm.addTags') }}</h3>
          <input v-model="newTag.en" type="text" placeholder="EN" class="input-style mb-4" />
          <input v-model="newTag.th" type="text" placeholder="TH" class="input-style mb-4" />
          <h3 class="mb-2">{{ $t('productForm.descriptionTags') }}</h3>
          <textarea v-model="newCategoryDescription" maxlength="1000" class="input-style mb-3"></textarea>
          <div class="flex justify-end space-x-4">
            <button @click="addTagFromModal" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Add</button>
            <button @click="showAddTagsModal = false" class="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import plusIcon from '~/assets/icon/plus.svg'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: {
    plusIcon,
    Multiselect,
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
      showAddCategoryModal: false,
      showAddTagsModal: false,
      newCategory: {en:"", th:""},
      newCategoryDescription: '',
      newTag: {en:"", th:""},
      newTagDescription: '',
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
  methods: {
    handleCategorySelection(value) {
      if (value === 'Add New Category') {
        this.showAddCategoryModal = true;
        this.product.category = '';
      }
    },
    handleTagSelection(value) {
      if (value === 'Add New Tag') {
        this.showAddTagsModal = true;
        this.product.tags.pop();
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/categories');
        this.categories = response.data.map(category => category.name);//Update categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchTags() {
      try {
        const response = await this.$axios.get('/tags');
        this.tags = response.data.map(tag => tag.name); // Update tags
        this.tags = response.data.map(tag => ({"en": tag.name.en, "th": tag.name.th, "id": tag._id})); // Update tags
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },
    addCategoryFromModal() {
      if (this.newCategory.en.trim() || this.newCategory.th.trim()) {
        this.$axios.post('/categories', {
          name: {
            en: this.newCategory.en.trim(),
            th: this.newCategory.th.trim()
          },
          description: this.newCategoryDescription.trim(),
        })
          .then(response => {
            this.categories.push(response.data.name);
            this.product.category = response.data.name;
            this.newCategory = '';
            this.newCategoryDescription = '';
            this.showAddCategoryModal = false;
          })
          .catch(error => {
            console.error('Error creating category:', error);
          });
      }
    },
    addTagFromModal() {
      if (this.newTag.en.trim() || this.newTag.th.trim()) {
        this.$axios.post('/tags', {
          name: {
            en: this.newTag.en.trim(),
            th: this.newTag.th.trim()
          },
          description: this.newTagDescription.trim(),
        })
          .then(response => {
            this.tags.push(response.data.name);
            this.product.tags.push(response.data.name);
            this.newTag = '';
            this.newTagDescription = '';
            this.showAddTagsModal = false;
          })
          .catch(error => {
            console.error('Error creating tag:', error);
          });
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await this.$axios.put(`/products/${this.product.id}`, this.product);
          this.$emit('updateProduct', this.product);
        } else {
          const response = await this.$axios.post('/products', this.product);
          this.$emit('addProduct', response.data);
        }
      } catch (error) {
        console.error('Error submitting product:', error);
      }
    },
  },
  mounted() {
    this.fetchCategories(); // Call a function to retrieve Categories from the API.
    this.fetchTags(); // Call a function to retrieve tags from the API.
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
