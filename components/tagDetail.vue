<template>
  <div class="p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{ $t('tags.detailTitle') }}</h1>
    
    <!-- Name -->
    <div>
      <h2 class="text-lg font-semibold">{{ $t('tags.name') }}</h2>
      <p>{{ tagData.name[$i18n.locale] }}</p>
    </div>
    <hr class="my-4"/>
    <!-- Description -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold">{{ $t('tags.description') }}</h2>
      <p class="whitespace-pre-line">{{ tagData.description }}</p>
    </div>
    <hr class="my-4"/>
    <!-- Referenced Products -->
    <div v-if="tagData.referencedProducts.length" class="mb-4">
      <h2 class="text-lg font-semibold">{{ $t('tags.referencedProducts') }}</h2>
      <ul class="list-disc">
        <li 
          v-for="productId in tagData.referencedProducts" 
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
      <h2 class="text-lg font-semibold">{{ $t('tags.referencedProducts') }}</h2>
      <p>{{ $t('tags.noReferencedProducts') }}</p>
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
  name: "TagDetail",
  components: {
    copyIcon,
  },
  props: {
    tagData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.$toast.success(this.$t('alert.copy.success'));
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          this.$toast.error(this.$t('alert.copy.error'));
        });
    },
  }
};
</script>

<style scoped>
/* Optional styling */
</style>