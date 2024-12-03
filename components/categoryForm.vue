<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
        <h3 class="mb-2 text-lg font-semibold">
          {{ mode === 'edit' ? $t('categories.editCategory') : $t('categories.addCategory') }}
        </h3>
        <hr class="-mx-6 border-gray-300 mb-4" />
        <!-- English Input -->
        <div class="flex items-center mb-4 relative">
          <englishIcon class="w-auto h-10 mr-2 text-current text-gray-300" />
          <input
            v-model="categoryData.en"
            maxlength="50"
            type="text"
            placeholder="EN"
            class="input-style flex-1"
          />
          <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {{ categoryData.en.length }}/50
          </span>
        </div>
      
        <!-- Thai Input -->
        <div class="flex items-center mb-4 relative">
          <thaiIcon class="w-auto h-10 mr-2 text-current text-gray-300" />
          <input
            v-model="categoryData.th"
            maxlength="50"
            type="text"
            placeholder="TH"
            class="input-style flex-1"
          />
          <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {{ categoryData.th.length }}/50
          </span>
        </div>
      
        <!-- Description Textarea -->
        <h3 class="mb-2">{{ $t('categories.descriptionCategory') }}</h3>
        <div class="relative">
          <textarea
            v-model="categoryData.description"
            maxlength="250"
            class="input-style"
          ></textarea>
          <span class="block text-sm text-gray-400 text-left">
            {{ categoryData.description.length }}/250
          </span>
        </div>
      
        <div class="flex justify-end space-x-4">
          <button
            @click="handleSubmit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {{ mode === 'edit' ? $t('button.update') : $t('button.add') }}
          </button>
          <button @click="resetForm()" class="bg-gray-400 text-white px-4 py-2 rounded-lg">
            {{ $t('button.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import thaiIcon from '~/assets/icon/thaiIcon.svg';
import englishIcon from '~/assets/icon/englishIcon.svg';

export default {
  components: {
    thaiIcon,
    englishIcon
  },
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
    mode: {
      handler(value) {
        if(value === 'add') {
          this.categoryData = {
            en: '',
            th: '',
            description: '',
          }
        }
      }
    }
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
