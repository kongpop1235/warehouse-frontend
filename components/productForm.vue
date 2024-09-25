<template>
  <div>
    <h2>{{ isEdit ? $t('productForm.editTitle') : $t('productForm.addTitle') }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>{{ $t('productForm.name') }}</label>
        <input v-model="product.name" type="text" required />
      </div>
      <div>
        <label>{{ $t('productForm.description') }}</label>
        <textarea v-model="product.description"></textarea>
      </div>
      <div>
        <label>{{ $t('productForm.category') }}</label>
        <input v-model="product.category" type="text" required />
      </div>
      <div>
        <label>{{ $t('productForm.tags') }}</label>
        <input v-model="product.tags" type="text" required />
      </div>
      <div>
        <label>{{ $t('productForm.price') }}</label>
        <input v-model="product.price" type="number" required />
      </div>
      <div>
        <label>{{ $t('productForm.discountPrice') }}</label>
        <input v-model="product.discountPrice" type="number" />
      </div>
      <div>
        <label>{{ $t('productForm.discountPercentage') }}</label>
        <input v-model="product.discountPercentage" type="number" />
      </div>
      <div>
        <label>{{ $t('productForm.stockQuantity') }}</label>
        <input v-model="product.stockQuantity" type="number" required />
      </div>
      <div>
        <label>{{ $t('productForm.supplier') }}</label>
        <input v-model="product.supplier" type="text" />
      </div>
      <div>
        <label>{{ $t('productForm.barcode') }}</label>
        <input v-model="product.barcode" type="text" />
      </div>
      <div>
        <label>{{ $t('productForm.costPrice') }}</label>
        <input v-model="product.costPrice" type="number" required />
      </div>
      <div>
        <label>{{ $t('productForm.productURL') }}</label>
        <input v-model="product.productURL" type="text" />
      </div>
      <div>
        <label>{{ $t('productForm.internalNotes') }}</label>
        <textarea v-model="product.internalNotes"></textarea>
      </div>
      <button type="submit">{{ isEdit ? $t('productForm.update') : $t('productForm.add') }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['editProduct'],
  data() {
    return {
      product: this.editProduct || {
        name: '',
        description: '',
        category: '',
        tags: '',
        price: 0,
        discountPrice: 0,
        discountPercentage: 0,
        stockQuantity: 0,
        supplier: '',
        barcode: '',
        costPrice: 0,
        productURL: '',
        internalNotes: '',
      },
      isEdit: !!this.editProduct,
    }
  },
  methods: {
    async submitForm() {
      try {
        const token =
          this.$store.getters['auth/getToken'] || this.$cookies.get('token')
        if (!token) {
          throw new Error('No token available')
        }

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
  },
}
</script>
