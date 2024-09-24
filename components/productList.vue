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
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.discountPrice || '-' }}</td>
          <td>{{ product.stockQuantity }}</td>
          <td>{{ product.supplier || '-' }}</td>
          <td>
            <button @click="editProduct(product)">{{ $t('productList.edit') }}</button>
            <button @click="deleteProduct(product.id)">{{ $t('productList.delete') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['products'], // รับข้อมูลสินค้าผ่าน prop
  methods: {
    editProduct(product) {
      this.$emit('edit', product) // ส่ง event กลับไปให้ component หลัก
    },
    deleteProduct(id) {
      this.$emit('delete', id) // ส่ง event กลับไปให้ component หลัก
    },
  },
}
</script>
