<template>
  <div class="relative overflow-x-auto bg-white p-2.5 rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">{{ $t('productList.name') }}</th>
          <th class="px-6 py-3">{{ $t('productList.category') }}</th>
          <th class="px-6 py-3">{{ $t('productList.price') }}</th>
          <th class="px-6 py-3">{{ $t('productList.discountPrice') }}</th>
          <th class="px-6 py-3">{{ $t('productList.stockQuantity') }}</th>
          <th class="px-6 py-3">{{ $t('productList.supplier') }}</th>
          <th class="px-6 py-3 text-center">{{ $t('productList.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ product.name }}</td>
          <td class="px-6 py-4">{{ product.category[$i18n.locale] }}</td>
          <td class="px-6 py-4">{{ product.price }}</td>
          <td class="px-6 py-4">{{ product.discountPrice || '-' }}</td>
          <td class="px-6 py-4">{{ product.stockQuantity }}</td>
          <td class="px-6 py-4">{{ product.supplier || '-' }}</td>
          <td class="px-6 py-4 text-center">
            <ul class="flex justify-center space-x-2.5">
              <li
                class="flex cursor-pointer hover:text-blue-600 transition-colors duration-500 ease-in-out"
                @click="showProductDetail(product)"
              >
                <viewIcon class="w-5 h-5 text-current" />
              </li>
              <li
                class="flex cursor-pointer hover:text-yellow-600 transition-colors duration-500 ease-in-out"
                @click="editProduct(product)"
              >
                <editIcon class="w-5 h-5 text-current" />
              </li>
              <li
                class="flex cursor-pointer hover:text-red-600 transition-colors duration-500 ease-in-out"
                @click="confirmDelete(product._id)"
              >
                <deleteIcon class="w-5 h-5 text-current" />
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Delete Confirmation -->
    <transition name="fade" mode="out-in">
      <div v-if="showDeleteConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <p class="text-center mb-4">{{ $t('alert.confirmDelete.message') }}</p>
          <div class="flex justify-center space-x-4">
            <button @click="deleteProduct" class="bg-red-600 text-white px-4 py-2 rounded-lg">{{ $t('alert.confirmDelete.yes') }}</button>
            <button @click="showDeleteConfirmation = false" class="bg-gray-400 text-white px-4 py-2 rounded-lg">{{ $t('alert.confirmDelete.no') }}</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal for Product Details -->
    <transition name="fade" mode="out-in">
      <div v-if="showDetail" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <productDetail :product="selectedProduct" @closeDetail="showDetail = false" />
      </div>
    </transition>
  </div>
</template>

<script>
import viewIcon from '~/assets/icon/view.svg';
import editIcon from '~/assets/icon/edit.svg';
import deleteIcon from '~/assets/icon/delete.svg';
import productDetail from '~/components/productDetail.vue';

export default {
  components: {
    viewIcon,
    editIcon,
    deleteIcon,
    productDetail
  },
  props: ['products'],
  data() {
    return {
      showDeleteConfirmation: false,
      productIdToDelete: null,
      showDetail: false,
      selectedProduct: null
    };
  },
  methods: {
    editProduct(product) {
      this.$emit('edit', product);
    },
    confirmDelete(productId) {
      this.productIdToDelete = productId;
      this.showDeleteConfirmation = true;
    },
    async deleteProduct() {
      try {
        await this.$axios.delete(`/products/${this.productIdToDelete}`);
        this.$emit('delete', this.productIdToDelete);
        this.showDeleteConfirmation = false;
        this.productIdToDelete = null;
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    showProductDetail(product) {
}
      this.selectedProduct = product;
      this.showDetail = true;
    }
  }
};
</script>
