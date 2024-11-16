<template>
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">{{$t('navbar.manageCategories')}}</h1>
    
    <!-- Search Input -->
    <div class="flex items-center justify-between mb-4">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by ID or Name"
        class="border border-gray-300 rounded-lg px-4 py-2 flex-1 mr-4 focus:ring focus:ring-blue-300 focus:border-blue-500"
      />
        
      <!-- Add Category Button -->
      <button
        @click="toggleCategoryForm"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {{$t('categories.addCategory')}}
      </button>
    </div>

    <!-- Category List -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">ID</th>
          <th class="px-6 py-3">{{$t('categories.name')}} (EN)</th>
          <th class="px-6 py-3">{{$t('categories.name')}} (TH)</th>
          <th class="px-6 py-3">{{$t('categories.description')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in filteredCategories"
          :key="category._id"
          class="bg-white border-b"
        >
          <td class="px-6 py-4">{{ category._id }}</td>
          <td class="px-6 py-4">{{ category.name.en }}</td>
          <td class="px-6 py-4">{{ category.name.th }}</td>
          <td class="px-6 py-4">{{ category.description || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: [], // All categories fetched from the API
      searchQuery: '', // Search input value
      showForm: false,
    };
  },
  computed: {
    filteredCategories() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.categories.filter(category => 
        category._id.toLowerCase().includes(query) || // Search by ID
        category.name.en.toLowerCase().includes(query) || // Search by English Name
        category.name.th.toLowerCase().includes(query) // Search by Thai Name
      );
    },
  },
  methods: {
    toggleCategoryForm() {
      this.showForm = !this.showForm;
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
