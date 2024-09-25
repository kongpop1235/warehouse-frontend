<template>
  <div>
    <h2>{{ $t('productList.title') }}</h2>
    <table>
      <thead>
        <tr>
          <th>{{ $t('productList.name') }}</th>
          <th>{{ $t('productList.category') }}</th>
          <th>{{ $t('productList.price') }}</th>
          <th>{{ $t('productList.discountPrice') }}</th>
          <th>{{ $t('productList.stockQuantity') }}</th>
          <th>{{ $t('productList.supplier') }}</th>
          <th>{{ $t('productList.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.discountPrice || '-' }}</td>
          <td>{{ product.stockQuantity }}</td>
          <td>{{ product.supplier || '-' }}</td>
          <td>
            <button @click="editProduct(product)">{{ $t('productList.edit') }}</button>
            <button @click="deleteProduct(product._id)">{{ $t('productList.delete') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['products'], // Receive product information through prop
  methods: {
    editProduct(product) {
      this.$emit('edit', product) // Send an event back to the main component.
    },
    async deleteProduct(id) {
      const response = await this.$axios.delete('/products/' + id, this.product)
      // this.$emit('delete', _id) // Send an event back to the main component.
    },
  },
}
</script>
