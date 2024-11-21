<template>
  <nav class="fixed inset-y-0 left-0 w-64 bg-white text-textDefault flex flex-col py-6 border-customLightGray border-r-2">
    <ul>
      <li>
        <nuxt-link to="/dashboard" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 textDefault hover:bg-customLightBlue hover:text-customDarkBlue">
          <DashboardIcon class="w-5 h-5 text-current" />
          <span>{{$t('navbar.dashboard')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/products" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 textDefault hover:bg-customLightBlue hover:text-customDarkBlue">
          <ManageProductsIcon class="w-5 h-5 text-current" />
          <span>{{$t('navbar.manageProducts')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/orders" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 textDefault hover:bg-customLightBlue hover:text-customDarkBlue">
          <OrderIcon class="w-5 h-5 text-current" />
          <span>{{$t('navbar.orders')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/suppliers" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 textDefault hover:bg-customLightBlue hover:text-customDarkBlue">
          <SuppliersIcon class="w-5 h-5 text-current" />
          <span>{{$t('navbar.suppliers')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/categories" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 textDefault hover:bg-customLightBlue hover:text-customDarkBlue">
          <CategoryIcon class="w-5 h-5 text-current" />
          <span>{{$t('navbar.manageCategories')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tags" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 textDefault hover:bg-customLightBlue hover:text-customDarkBlue">
          <TagsIcon class="w-5 h-5 text-current" />
          <span>{{$t('navbar.manageTags')}}</span>
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/reports" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 hover:bg-customLightBlue">
          <span>{{$t('navbar.reports')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 hover:bg-customLightBlue">
          <span>{{$t('navbar.users')}}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/settings" exact-active-class="bg-customLightBlue border-customDarkBlue border-l-4 text-customDarkBlue pl-[24px]" class="flex items-center space-x-2 px-6 py-3 pl-7 hover:bg-customLightBlue">
          <span>{{$t('navbar.settings')}}</span>
        </nuxt-link>
      </li> -->
    </ul>
    <div class="mt-auto">
      <a @click="logout" class="flex items-center space-x-2 px-6 py-3 hover:bg-red-300 cursor-pointer hover:text-red-600">
        <LogoutIcon class="w-5 h-5 text-current" />
        <span>{{$t('navbar.logout')}}</span>
      </a>
      <div class="flex space-x-2">
        <button @click="changeLanguage('en')" class="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200">English</button>
        <button @click="changeLanguage('th')" class="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200">ไทย</button>
      </div>
    </div>
  </nav>
</template>

<script>
import DashboardIcon from '~/assets/icon/dashboard.svg'
import ManageProductsIcon from '~/assets/icon/manageProducts.svg'
import OrderIcon from '~/assets/icon/order.svg'
import SuppliersIcon from '~/assets/icon/suppliers.svg'
import LogoutIcon from '~/assets/icon/logout.svg'
import CategoryIcon from '~/assets/icon/category.svg';
import TagsIcon from '~/assets/icon/tag.svg';
export default {
  name: 'SideNavBar',
  components: {
    DashboardIcon,
    ManageProductsIcon,
    OrderIcon,
    SuppliersIcon,
    LogoutIcon,
    CategoryIcon,
    TagsIcon
  },
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
/* No custom styles needed, everything handled by Tailwind CSS */
</style>
