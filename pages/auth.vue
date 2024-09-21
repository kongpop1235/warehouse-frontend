<template>
  <div class="auth-container">
    <AuthForm :isLogin="isLogin" @toggle="toggleForm" />
  </div>
</template>

<script>
import AuthForm from '~/components/AuthForm.vue'

export default {
  data() {
    return {
      isLogin: true,
    }
  },
  components: { AuthForm },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin
    },
  },
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
