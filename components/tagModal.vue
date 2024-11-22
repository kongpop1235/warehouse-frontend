<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg z-60 w-full max-w-md">
        <h3 class="mb-2 text-lg font-semibold">
          {{ mode === 'edit' ? $t('tags.editTag') : $t('tags.addTag') }}
        </h3>
        <div class="flex items-center mb-4 relative">
          <englishIcon class="w-auto h-10 mr-2 text-current text-gray-300" />
          <input
            v-model="tagData.en"
            maxlength="50"
            type="text"
            placeholder="Tag Name (EN)"
            class="input-style flex-1"
          />
        </div>
        <div class="flex items-center mb-4 relative">
          <thaiIcon class="w-auto h-10 mr-2 text-current text-gray-300" />
          <input
            v-model="tagData.th"
            maxlength="50"
            type="text"
            placeholder="Tag Name (TH)"
            class="input-style flex-1"
          />
        </div>
        <textarea
          v-model="tagData.description"
          maxlength="250"
          placeholder="Description"
          class="input-style mb-3"
        ></textarea>
        <div class="flex justify-end space-x-4">
          <button @click="handleSubmit" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
            {{ mode === 'edit' ? $t('button.update') : $t('button.add') }}
          </button>
          <button @click="$emit('close')" class="bg-gray-400 text-white px-4 py-2 rounded-lg">
            {{$t('button.cancel')}}
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
    tag: {
      type: Object,
      default: () => ({
        en: '',
        th: '',
        description: '',
        _id: null,
      }),
    },
  },
  data() {
    return {
      tagData: {
        en: '',
        th: '',
        description: '',
        _id: null,
      },
    };
  },
  watch: {
    tag: {
      handler(newValue) {
        if (this.mode === 'edit' && newValue) {
          this.tagData = { ...newValue };
        }
      },
      immediate: true,
    },
    mode: {
      handler(newValue) {
        if (newValue === 'add') {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    async handleSubmit() {
      if (this.mode === 'edit') {
        await this.updateTag();
      } else {
        await this.addTag();
      }
    },
    async addTag() {
      if (this.tagData.en.trim() || this.tagData.th.trim()) {
        try {
          const response = await this.$axios.post('/tags', {
            name: {
              en: this.tagData.en,
              th: this.tagData.th,
            },
            description: this.tagData.description,
          });
          this.$emit('tagAdded', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error adding tag:', error);
        }
      }
    },
    async updateTag() {
      if (this.tagData.en.trim() || this.tagData.th.trim()) {
        try {
          const response = await this.$axios.put(`/tags/${this.tagData._id}`, {
            name: {
              en: this.tagData.en,
              th: this.tagData.th,
            },
            description: this.tagData.description,
          });
          this.$emit('tagUpdated', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error updating tag:', error);
        }
      }
    },
    resetForm() {
      this.tagData = { en: '', th: '', description: '', _id: null };
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
