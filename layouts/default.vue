<template>
  <div class="h-full">
    <sideNavBar v-if="isAuthenticated" />

    <div class="bg-gray-100 h-full p-[30px]" :class="{'content-authenticated': isAuthenticated, 'content': !isAuthenticated}">
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
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
}
</script>

<style scoped>
.content {
  padding: 20px;
}

.content-authenticated {
  margin-left: 256px;
}
</style>
