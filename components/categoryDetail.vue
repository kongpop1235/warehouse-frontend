<template>
  <div class="p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{ $t('categories.detailTitle') }}</h1>

    <!-- Name -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold">{{ $t('categories.name') }}</h2>
      <p>{{ categoryData.name[$i18n.locale] }}</p>
    </div>
    <hr class="my-4" />

    <!-- Description -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold">{{ $t('categories.description') }}</h2>
      <p class="whitespace-pre-line">{{ categoryData.description || $t('categories.noDescription') }}</p>
    </div>
    <hr class="my-4" />

    <!-- Referenced Products -->
    <div v-if="categoryData.referencedProducts.length" class="mb-4">
      <h2 class="text-lg font-semibold">{{ $t('categories.referencedProducts') }}</h2>
      <ul class="list-disc">
        <li
          v-for="productId in categoryData.referencedProducts"
          :key="productId"
          class="flex items-center mb-2"
        >
          <span class="mr-3">{{ productId }}</span>
          <button
            @click="copyToClipboard(productId)"
            class="hover:text-blue-600 transition-colors duration-300 ease-in-out flex items-center"
          >
            <copyIcon class="w-5 h-5 text-current" />
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="mb-4">
      <h2 class="text-lg font-semibold">{{ $t('categories.referencedProducts') }}</h2>
      <p>{{ $t('categories.noReferencedProducts') }}</p>
    </div>

    <!-- Close Button -->
    <div class="flex justify-end">
      <button
        class="bg-red-600 text-white px-4 py-2 rounded-lg"
        @click="$emit('close')"
      >
        {{ $t('button.close') }}
      </button>
    </div>
  </div>
</template>

<script>
import copyIcon from '~/assets/icon/copy.svg';

export default {
  name: 'CategoryDetail',
  components: {
    copyIcon,
  },
  props: {
    categoryData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert(this.$t('alert.copy.success'));
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          alert(this.$t('alert.copy.error'));
        });
    },
  },
};
</script>

<style scoped>
/* Optional styling for detail component */
</style>
  