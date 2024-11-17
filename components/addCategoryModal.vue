<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
        <h3 class="mb-2">{{ $t('productForm.addCategory') }}</h3>
        <input v-model="newCategory.en" type="text" placeholder="EN" class="input-style mb-4" />
        <input v-model="newCategory.th" type="text" placeholder="TH" class="input-style mb-4" />
        <h3 class="mb-2">{{ $t('productForm.descriptionCategory') }}</h3>
        <textarea v-model="newCategoryDescription" maxlength="1000" class="input-style mb-3"></textarea>
        <div class="flex justify-end space-x-4">
          <button @click="addCategory" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add
          </button>
          <button @click="$emit('close')" class="bg-gray-400 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newCategory: { en: '', th: '' },
      newCategoryDescription: '',
    };
  },
  methods: {
    async addCategory() {
      if (this.newCategory.en.trim() || this.newCategory.th.trim()) {
        try {
          const response = await this.$axios.post('/categories', {
            name: this.newCategory,
            description: this.newCategoryDescription,
          });
          this.$emit('categoryAdded', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error creating category:', error);
        }
      }
    },
    resetForm() {
      this.newCategory = { en: '', th: '' };
      this.newCategoryDescription = '';
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.input-style {
  @apply border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-300 focus:border-blue-500;
}
</style>
