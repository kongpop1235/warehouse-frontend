<template>
  <div>
    <h1>{{ $t('navbar.manageProducts') }}</h1>

    <!-- แสดงรายการสินค้า -->
    <ProductList :products="products" />

    <!-- ฟอร์มสำหรับเพิ่ม/แก้ไขสินค้า -->
    <ProductForm />
  </div>
</template>

<script>
import ProductList from '~/components/ProductList.vue'
import ProductForm from '~/components/ProductForm.vue'

export default {
  components: {
    ProductList,
    ProductForm,
  },
  data() {
    return {
      products: [], // เก็บรายการสินค้าทั้งหมด
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('/products')
      this.products = response // นำข้อมูลที่ได้จาก API มาเก็บใน products
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
}
</script>