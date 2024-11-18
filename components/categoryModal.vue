<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
        <h3 class="mb-2">
          {{ mode === 'edit' ? $t('productForm.editCategory') : $t('productForm.addCategory') }}
        </h3>
        <input v-model="categoryData.en" type="text" placeholder="EN" class="input-style mb-4" />
        <input v-model="categoryData.th" type="text" placeholder="TH" class="input-style mb-4" />
        <h3 class="mb-2">{{ $t('productForm.descriptionCategory') }}</h3>
        <textarea v-model="categoryData.description" maxlength="1000" class="input-style mb-3"></textarea>
        <div class="flex justify-end space-x-4">
          <button
            @click="handleSubmit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {{ mode === 'edit' ? $t('button.update') : $t('button.add') }}
          </button>
          <button @click="$emit('close')" class="bg-gray-400 text-white px-4 py-2 rounded-lg">
            {{ $t('button.cancel') }}
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
    mode: {
      type: String,
      default: 'add', // 'add' or 'edit'
    },
    category: {
      type: Object,
      default: () => ({
        en: '',
        th: '',
        description: '',
      }),
    },
  },
  data() {
    return {
      categoryData: {
        en: '',
        th: '',
        description: '',
      },
    };
  },
  watch: {
    category: {
      handler(newValue) {
        if (this.mode === 'edit' && newValue) {
          this.categoryData = { ...newValue };
        }
      },
      immediate: true,
    },
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.mode === 'edit') {
          await this.updateCategory();
        } else {
          await this.addCategory();
        }
      } catch (error) {
        console.error('Error submitting category:', error);
      }
    },
    async addCategory() {
      if (this.categoryData.en.trim() || this.categoryData.th.trim()) {
        try {
          const response = await this.$axios.post('/categories', {
            name: { en: this.categoryData.en, th: this.categoryData.th },
            description: this.categoryData.description,
          });
          this.$emit('categoryAdded', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error creating category:', error);
        }
      }
    },
    async updateCategory() {
      if (this.categoryData.en.trim() || this.categoryData.th.trim()) {
        try {
          const response = await this.$axios.put(`/categories/${this.categoryData._id}`, {
            name: { en: this.categoryData.en, th: this.categoryData.th },
            description: this.categoryData.description,
          });
          this.$emit('categoryUpdated', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error updating category:', error);
        }
      }
    },
    resetForm() {
      this.categoryData = { en: '', th: '', description: '' };
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
