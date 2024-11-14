<template>
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4">{{ $t('productDetail.title') }}</h2>
    
    <div class="flex items-center space-x-2">
      <p class="text-gray-400 text-sm">{{ $t('productDetail.id') }}: {{ product._id }}</p>
      <span class="flex cursor-pointer hover:text-blue-600 transition-colors text-gray-400 duration-500 ease-in-out" @click="copyId(product._id)">
        <copyIcon class="w-4 h-4 text-current" />
      </span>
    </div>
    
    <p><span class="text-gray-500">{{ $t('productDetail.productName') }}</span>
      <br>
      <strong>
        {{ product.name }}
      </strong>
    </p>
    <p>
      <span class="text-gray-500">{{ $t('productDetail.description') }}</span>
      <br>
      <strong>
        {{ product.description || '-' }}
      </strong>
    </p>
    <p><span class="text-gray-500">{{ $t('productDetail.category') }}</span>
      <br>
      <strong class="cursor-pointer" :data-tippy-content="product.category.description ? product.category.description : '-'">
        {{ product.category[$i18n.locale] }}
      </strong>
    </p>
    
    <p class="mb-3"><span class="text-gray-500">Tags</span><br></p>
    <strong>
      <span v-if="product.tags && product.tags.length" class="my-5">
        <span
          v-for="(tag, index) in product.tags"
          :key="tag.id"
          :data-tippy-content="tag.description ? tag.description : '-'"
          class="px-3.5 pt-1 pb-2 mr-2 bg-gray-500 rounded-lg text-center text-gray-200 cursor-pointer"
        >
          {{ tag[$i18n.locale] }}
        </span>
      </span>
      <span v-else>-</span>
    </strong>
    
    <div class="grid grid-cols-2 gap-4">
      <p class="mt-3">
        <span class="text-gray-500">{{ $t('productDetail.price') }}</span><br>
        <strong>{{ product.price }}</strong>
      </p>
      <p class="mt-3">
        <span class="text-gray-500">{{ $t('productDetail.costPrice') }}</span><br>
        <strong>{{ product.costPrice }}</strong>
      </p>
      <p class="mt-3">
        <span class="text-gray-500">{{ $t('productDetail.discountPrice') }}</span><br>
        <strong>{{ product.discountPrice || '-' }}</strong>
      </p>
      <p class="mt-3">
        <span class="text-gray-500">{{ $t('productDetail.discountPercentage') }}</span><br>
        <strong>{{ (product.discountPercentage * 100).toFixed(2) }}%</strong>
      </p>
    </div>
    
    <p><span class="text-gray-500">{{ $t('productDetail.stockQuantity') }}</span><br><strong>{{ product.stockQuantity }}</strong></p>
    <p><span class="text-gray-500">{{ $t('productDetail.supplier') }}</span><br><strong>{{ product.supplier || '-' }}</strong></p>
    
    <p><span class="text-gray-500">{{ $t('productDetail.productURL') }}</span><br>
      <a v-if="product.productURL" :href="product.productURL" target="_blank" class="text-blue-500 underline"><strong>{{ product.productURL }}</strong></a>
      <span v-else><strong>-</strong></span>
    </p>
    
    <p><span class="text-gray-500">{{ $t('productDetail.internalNotes') }}</span><br><strong>{{ product.internalNotes || '-' }}</strong></p>
    
    <div class="grid grid-cols-2 gap-4">
      <p><span class="text-gray-500">{{ $t('productDetail.createdAt') }}</span><br><strong>{{ formatDate(product.createdAt) }}</strong></p>
      <p><span class="text-gray-500">{{ $t('productDetail.updatedAt') }}</span><br><strong>{{ formatDate(product.updatedAt) }}</strong></p>
    </div>
    
    <button @click="$emit('closeDetail')" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
      {{ $t('productDetail.close') }}
    </button>
  </div>
</template>

<script>
import copyIcon from '~/assets/icon/copy.svg';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward.css';

export default {
  components: {
    copyIcon,
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mounted() {
    tippy('[data-tippy-content]', {
      placement: 'top',
      theme: 'light',
      animation: 'shift-toward',
      duration: 400,
    });
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    copyId(id) {
      navigator.clipboard.writeText(id)
        .then(() => {
          this.$toast.success('Product ID copied to clipboard!');
        })
        .catch((error) => {
          console.error('Failed to copy product ID:', error);
        });
    },
    
  }
}
</script>

<style scoped>
/* Custom styles for tooltip if needed */
</style>
