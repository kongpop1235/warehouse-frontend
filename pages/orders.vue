<template>
  <div>
    <h1>{{ $t('orderList.title') }}</h1>
    <table>
      <thead>
        <tr>
          <th>{{ $t('orderList.customer') }}</th>
          <th>{{ $t('orderList.totalPrice') }}</th>
          <th>{{ $t('orderList.status') }}</th>
          <th>{{ $t('orderList.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.customer.name }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="viewOrder(order._id)">{{ $t('orderList.view') }}</button>
            <button v-if="isAdmin" @click="cancelOrder(order._id)">{{ $t('orderList.cancel') }}</button>
            <button v-if="isAdmin" @click="deleteOrder(order._id)">{{ $t('orderList.delete') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
    <OrderForm @addOrder="handleAddOrder"/>
  </div>
</template>

<script>
import OrderForm from '~/components/OrderForm.vue'
export default {
  components: {
    OrderForm,
  },
  data() {
    return {
      orders: [],
      isAdmin: false, // Verify user rights
    }
  },
  async fetch() {
    try {
      // Fetch all orders from backend
      const response = await this.$axios.get('/orders')
      this.orders = response.data
      this.isAdmin = this.$store.getters['auth/isAdmin'] //Check if the user is admin or not.
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  },
  methods: {
    viewOrder(id) {
      this.$router.push(`/orders/${id}`)
    },
    async cancelOrder(id) {
      try {
        await this.$axios.put(`/orders/${id}/cancel`)
        this.fetch() // Load new order list
      } catch (error) {
        console.error('Error cancelling order:', error)
      }
    },
    async deleteOrder(id) {
      try {
        await this.$axios.delete(`/orders/${id}`)
        this.fetch() // Load new order list
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    },
    handleAddOrder(order) {
      console.log('Order added:', order)
    },
  },
}
</script>
