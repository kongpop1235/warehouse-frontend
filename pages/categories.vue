<template>
  <div class="p-6 bg-white rounded-lg">
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
        @click="editMode = false, showAddCategoryModal = true"
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
          <th class="px-6 py-3">{{$t('categories.name')}}</th>
          <th class="px-6 py-3">{{$t('categories.description')}}</th>
          <th class="px-6 py-3 text-center">{{$t('categories.actions')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in filteredCategories"
          :key="category._id"
          class="bg-white border-b"
        >
          <td class="px-6 py-4 w-1/6">{{ category._id }}</td>
          <td class="px-6 py-4 w-1/3">{{ category.name[$i18n.locale] }}</td>
          <td class="px-6 py-4 w-1/2">{{ category.description || '-' }}</td>
          <td class="px-6 py-4 text-center">
            <div class="flex justify-center space-x-3">
              <!-- Detail Icon -->
              <button
                class="hover:text-blue-600 transition-colors duration-500"
                @click="openDetail(category)"
              >
                <viewIcon class="w-5 h-5 text-current" />
              </button>
              <!-- Edit Icon -->
              <button
                @click="editCategory(category)"
                class="hover:text-yellow-500 transition-colors"
              >
                <editIcon class="w-5 h-5 text-current" />
              </button>
              <!-- Delete Icon -->
              <button
                @click="deleteCategory(category._id)"
                class="hover:text-red-500 transition-colors"
              >
                <deleteIcon class="w-5 h-5 text-current" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Add/Edit Category Modal -->
    <categoryModal
      :show="showAddCategoryModal"
      :mode="editMode ? 'edit' : 'add'"
      :category="categoryToEdit"
      @categoryAdded="handleCategoryAdded"
      @categoryUpdated="handleCategoryUpdated"
      @close="showAddCategoryModal = false, editMode = false"
    />
    <!-- Detail Modal -->
    <transition name="fade" mode="out-in">
      <div
        v-if="showDetailModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white px-10 py-6 rounded-lg w-full max-w-3xl h-auto overflow-hidden">
          <categoryDetail :categoryData="selectedCategory" @close="closeDetailModal" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import categoryModal from '~/components/categoryModal.vue';
import editIcon from '~/assets/icon/edit.svg';
import deleteIcon from '~/assets/icon/delete.svg';
import categoryDetail from '~/components/categoryDetail.vue';
import viewIcon from '~/assets/icon/view.svg';

export default {
  name: 'Categories',
  components: {
    categoryModal,
    editIcon,
    deleteIcon,
    categoryDetail,
    viewIcon,
  },
  data() {
    return {
      categories: [], // All categories fetched from the API
      searchQuery: '', // Search input value
      showAddCategoryModal: false,
      editMode: false,
      categoryToEdit: null,
      showDetailModal: false,
      selectedCategory: null,
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
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    handleCategoryAdded(category) {
      this.categories.push(category)
    },
    handleCategoryUpdated(updatedCategory) {
      const index = this.categories.findIndex(cat => cat._id === updatedCategory._id);
      if (index !== -1) {
        this.categories.splice(index, 1, updatedCategory);
      }
    },
    editCategory(category) {
      this.categoryToEdit = {"en": category.name.en, "th": category.name.th, "description": category.description, "_id": category._id};
      this.editMode = true;
      this.showAddCategoryModal = true;
    },
    openDetail(category) {
      this.selectedCategory = category;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
      this.selectedCategory = null;
    },
    async deleteCategory(categoryId) {
        if (confirm(this.$t('categories.alert.confirmDelete'))) {
            try {
                await this.$axios.delete(`/categories/${categoryId}`);
                this.categories = this.categories.filter(cat => cat._id !== categoryId);
                alert(this.$t('categories.deleteSuccess')); // Show success message
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert(this.$t(error.response.data.message)); // Display the error message from the back-end
                } else {
                    console.error('Error deleting category:', error);
                    alert(this.$t('categories.deleteError')); // Fallback message for unexpected errors
                }
            }
        }
    }
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
