<template>
  <nav class="navbar">
    <ul>
      <li><nuxt-link to="/dashboard">{{$t('navbar.dashboard')}}</nuxt-link></li>
      <li><nuxt-link to="/products">{{$t('navbar.manageProducts')}}</nuxt-link></li>
      <li><nuxt-link to="/inventory">{{$t('navbar.inventory')}}</nuxt-link></li>
      <li><nuxt-link to="/orders">{{$t('navbar.orders')}}</nuxt-link></li>
      <li><nuxt-link to="/suppliers">{{$t('navbar.suppliers')}}</nuxt-link></li>
      <li><nuxt-link to="/reports">{{$t('navbar.reports')}}</nuxt-link></li>
      <li><nuxt-link to="/users">{{$t('navbar.users')}}</nuxt-link></li>
      <li><nuxt-link to="/settings">{{$t('navbar.settings')}}</nuxt-link></li>
      <li><a @click="logout">{{$t('navbar.logout')}}</a></li>
    </ul>
    <div class="language-switcher">
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('th')">ไทย</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'sideNavBar',
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/auth')
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
    },
  },
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.navbar li {
  margin: 10px 0;
  width: 100%;
}

.navbar a {
  text-decoration: none;
  color: white;
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #444;
  border-radius: 5px;
}

.navbar a:hover {
  background-color: #555;
}

.language-switcher {
  margin-top: 20px;
  padding-left: 15px;
}

.language-switcher button {
  background-color: #fff;
  border: none;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.language-switcher button:hover {
  background-color: #ddd;
}
</style>
