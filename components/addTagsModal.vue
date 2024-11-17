<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
        <h3 class="mb-2">{{ $t('productForm.addTags') }}</h3>
        <input v-model="newTag.en" type="text" placeholder="EN" class="input-style mb-4" />
        <input v-model="newTag.th" type="text" placeholder="TH" class="input-style mb-4" />
        <h3 class="mb-2">{{ $t('productForm.descriptionTags') }}</h3>
        <textarea v-model="newTagDescription" maxlength="1000" class="input-style mb-3"></textarea>
        <div class="flex justify-end space-x-4">
          <button @click="addTag" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
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
      newTag: { en: '', th: '' },
      newTagDescription: '',
    };
  },
  methods: {
    async addTag() {
      if (this.newTag.en.trim() || this.newTag.th.trim()) {
        try {
          const response = await this.$axios.post('/tags', {
            name: this.newTag,
            description: this.newTagDescription,
          });
          this.$emit('tagAdded', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error creating tag:', error);
        }
      }
    },
    resetForm() {
      this.newTag = { en: '', th: '' };
      this.newTagDescription = '';
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
