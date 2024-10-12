<template>
  <div>
    <h2>{{ isEdit ? $t('orderForm.editTitle') : $t('orderForm.addTitle') }}</h2>
    <form @submit.prevent="submitForm">
      <div v-if="!isEdit">
        <!-- สินค้าที่เลือก -->
        <label>{{ $t('orderForm.product') }}</label>
        <select v-model="order.product" required>
          <option v-for="product in products" :key="product._id" :value="product._id">
            {{ product.name }} - {{ product.price }}
          </option>
        </select>
      </div>

      <div v-if="!isEdit">
        <!-- จำนวนสินค้า -->
        <label>{{ $t('orderForm.quantity') }}</label>
        <input v-model="order.quantity" type="number" required />
      </div>

      <div v-if="!isEdit">
        <!-- ราคาทั้งหมด -->
        <label>{{ $t('orderForm.totalPrice') }}</label>
        <input v-model="order.totalPrice" type="number" required />
      </div>

      <div v-if="isEdit">
        <!-- สถานะคำสั่งซื้อ -->
        <label>{{ $t('orderForm.status') }}</label>
        <select v-model="order.status" required>
          <option value="pending">{{ $t('orderForm.pending') }}</option>
          <option value="completed">{{ $t('orderForm.completed') }}</option>
          <option value="cancelled">{{ $t('orderForm.cancelled') }}</option>
        </select>
      </div>

      <button type="submit">{{ isEdit ? $t('orderForm.update') : $t('orderForm.create') }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['editOrder'],
  data() {
    return {
      order: this.editOrder || {
        product: '',
        quantity: 1,
        totalPrice: 0,
        status: 'pending',
      },
      products: [],
      isEdit: !!this.editOrder, // Check if it is edit mode or not.
    }
  },
  async mounted() {
    if (!this.isEdit) {
      // Retrieve product information if in new order creation mode.
      try {
        const response = await this.$axios.get('/products')
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEdit) {
          // Update order status
          await this.$axios.put(`/orders/${this.order._id}/status`, {
            status: this.order.status,
          })
          this.$emit('updateOrder', this.order)
        } else {
          // Create a new order
          await this.$axios.post('/orders', {
            orderItems: [
              { product: this.order.product, quantity: this.order.quantity },
            ],
            totalPrice: this.order.totalPrice,
          })
          this.$emit('addOrder', this.order)
        }

        this.$router.push('/orders')
      } catch (error) {
        console.error('Error submitting order:', error)
      }
    },
  },
}
</script>
