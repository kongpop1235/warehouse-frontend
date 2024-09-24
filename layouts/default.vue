<template>
  <div>
    <!-- แสดง sideNavBar เฉพาะเมื่อผู้ใช้เข้าสู่ระบบ -->
    <sideNavBar v-if="isAuthenticated" />

    <!-- เนื้อหาหลักของหน้า -->
    <div :class="{'content-authenticated': isAuthenticated, 'content': !isAuthenticated}">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import sideNavBar from '~/components/sideNavBar.vue'

export default {
  components: {
    sideNavBar,
  },
  computed: {
    // ดึงสถานะการเข้าสู่ระบบจาก Vuex Store
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
}
</script>

<style scoped>
/* สไตล์ปกติเมื่อไม่ได้เข้าสู่ระบบ */
.content {
  padding: 20px;
}

/* สไตล์เมื่อเข้าสู่ระบบ (มี Navbar ทางซ้าย) */
.content-authenticated {
  margin-left: 240px; /* เพิ่มระยะห่างด้านซ้ายเมื่อมี sideNavBar */
  padding: 20px;
}
</style>
