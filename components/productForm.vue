<template>
  <div>
    <h2>{{ isEdit ? $t('productForm.editTitle') : $t('productForm.addTitle') }}</h2>
    <form @submit.prevent="submitForm">
      <!-- ชื่อสินค้า -->
      <div>
        <label>{{ $t('productForm.name') }}</label>
        <input v-model="product.name" type="text" required />
      </div>

      <!-- รายละเอียดสินค้า -->
      <div>
        <label>{{ $t('productForm.description') }}</label>
        <textarea v-model="product.description"></textarea>
      </div>

      <!-- หมวดหมู่สินค้า -->
      <div>
        <label>{{ $t('productForm.category') }}</label>
        <input v-model="product.category" type="text" required />
      </div>

      <!-- แท็กสินค้า -->
      <div>
        <label>{{ $t('productForm.tags') }}</label>
        <input v-model="product.tags" type="text" required />
      </div>

      <!-- ราคา -->
      <div>
        <label>{{ $t('productForm.price') }}</label>
        <input v-model="product.price" type="number" required />
      </div>

      <!-- ราคาหลังหักส่วนลด (ถ้ามี) -->
      <div>
        <label>{{ $t('productForm.discountPrice') }}</label>
        <input v-model="product.discountPrice" type="number" />
      </div>

      <!-- เปอร์เซ็นต์ส่วนลด (ถ้ามี) -->
      <div>
        <label>{{ $t('productForm.discountPercentage') }}</label>
        <input v-model="product.discountPercentage" type="number" />
      </div>

      <!-- สต็อกคงเหลือ -->
      <div>
        <label>{{ $t('productForm.stockQuantity') }}</label>
        <input v-model="product.stockQuantity" type="number" required />
      </div>

      <!-- ผู้จัดจำหน่ายหรือผู้ผลิต -->
      <div>
        <label>{{ $t('productForm.supplier') }}</label>
        <input v-model="product.supplier" type="text" />
      </div>

      <!-- รหัสบาร์โค้ดหรือ QR Code -->
      <div>
        <label>{{ $t('productForm.barcode') }}</label>
        <input v-model="product.barcode" type="text" />
      </div>

      <!-- ต้นทุนสินค้า -->
      <div>
        <label>{{ $t('productForm.costPrice') }}</label>
        <input v-model="product.costPrice" type="number" required />
      </div>

      <!-- URL ของสินค้า -->
      <div>
        <label>{{ $t('productForm.productURL') }}</label>
        <input v-model="product.productURL" type="text" />
      </div>

      <!-- หมายเหตุภายใน -->
      <div>
        <label>{{ $t('productForm.internalNotes') }}</label>
        <textarea v-model="product.internalNotes"></textarea>
      </div>

      <!-- ปุ่มส่งฟอร์ม -->
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
    submitForm() {
      if (this.isEdit) {
        this.$emit('updateProduct', this.product)
      } else {
        this.$emit('addProduct', { ...this.product, id: Date.now() })
      }
    },
  },
}
</script>
