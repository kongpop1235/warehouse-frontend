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

      <!-- Category Select using Vue Multiselect with Custom Option Template -->
      <div>
        <label>{{ $t('productForm.category') }}</label>
        <multiselect
          v-model="product.category"
          :options="categoriesWithAddOption"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
          :show-labels="false"
          placeholder="Select or add a category"
          @select="handleCategorySelection"
        >
          <template #option="{ option }">
            <div v-if="option === 'Add New Category'" class="flex items-center">
              <plusIcon class="w-5 h-5 mr-2" />
              <span>{{ $t('productForm.addNewCategory') }}</span>
            </div>
            <div v-else>{{ option }}</div>
          </template>
        </multiselect>
      </div>

      <!-- Tags Select using Vue Multiselect with Custom Option Template -->
      <div>
        <label>{{ $t('productForm.tags') }}</label>
        <multiselect
          v-model="product.tags"
          :options="tagsWithAddOption"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
          :show-labels="false"
          placeholder="Select or add a tag"
          @select="handleTagSelection"
        >
          <template #option="{ option }">
            <div v-if="option === 'Add New Tag'" class="flex items-center">
              <plusIcon class="w-5 h-5 mr-2" />
              <span>{{ $t('productForm.addNewTags') }}</span>
            </div>
            <div v-else>{{ option }}</div>
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
          <h3>{{ $t('productForm.addCategory') }}</h3>
          <input v-model="newCategory" type="text" placeholder="New category" class="input-style mb-4" />
          <h3>{{ $t('productForm.descriptionCategory') }}</h3>
          <textarea v-model="newCategoryDescription" maxlength="1000" class="input-style"></textarea>
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
          <h3>{{ $t('productForm.addTags') }}</h3>
          <input v-model="newTag" type="text" placeholder="New tag" class="input-style mb-4" />
          <h3>{{ $t('productForm.descriptionTags') }}</h3>
          <textarea v-model="newCategoryDescription" maxlength="1000" class="input-style"></textarea>
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
    Multiselect
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
      categories: ['Electronics', 'Clothing', 'Accessories'], // Existing category list
      tags: ['New Arrival', 'On Sale', 'Popular'], // List of available tags
      showAddCategoryModal: false, // For displaying Modal, add a new Category.
      showAddTagsModal: false, // For displaying Modal, add new Tags.
      newCategory: '', // Store a new Category value.
      newCategoryDescription: '', // Store the description of the new Category.
      newTag: '', // Store new tags
      newTagDescription: '', // Store the description of the new Category.
    }
  },
  computed: {
    categoriesWithAddOption() {
      return ['Add New Category', ...this.categories];
    },
    tagsWithAddOption() {
      return ['Add New Tag', ...this.tags];
    }
  },
  methods: {
    handleCategorySelection(value) {
      if (value === 'Add New Category') {
        this.showAddCategoryModal = true;
        this.product.category = ''; // Reset selected value
      }
    },
    handleTagSelection(value) {
      if (value === 'Add New Tag') {
        this.showAddTagsModal = true;
        this.product.tags.pop(); // Remove this option from the list.
      }
    },
    addCategoryFromModal() {
      if (this.newCategory.trim()) {
        this.categories.push(this.newCategory.trim())
        this.product.category = this.newCategory.trim()
        this.newCategory = ''
        this.showAddCategoryModal = false
      }
    },
    addTagFromModal() {
      if (this.newTag.trim()) {
        this.tags.push(this.newTag.trim());
        this.product.tags.push(this.newTag.trim());
        this.newTag = '';
        this.showAddTagsModal = false;
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await this.$axios.put(`/products/${this.product.id}`, this.product)
          this.$emit('updateProduct', this.product) // Return to the main component.
        } else {
          const response = await this.$axios.post('/products', this.product)
          this.$emit('addProduct', response.data) // Send back newly created product information.
        }
      } catch (error) {
        console.error('Error submitting product:', error)
      }
    },
  }
}
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
