<template>
  <div class="p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{$t('navbar.manageTags')}}</h1>

    <!-- Search Input and Add Button -->
    <div class="flex items-center justify-between mb-4">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by ID or Name"
        class="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:ring focus:ring-blue-300 focus:border-blue-500"
      />
      
      <!-- Add Tag Button -->
      <button
        @click="openAddModal"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
      >
        {{$t('tags.addTag')}}
      </button>
    </div>

    <!-- Tags List -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3 w-1/6">ID</th>
          <th class="px-6 py-3 w-1/3">{{$t('tags.name')}}</th>
          <th class="px-6 py-3 w-1/3">{{$t('tags.description')}}</th>
          <th class="px-6 py-3 text-center w-1/6">{{$t('tags.actions')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="tag in filteredTags"
          :key="tag._id"
          class="bg-white border-b"
        >
          <td class="px-6 py-4 w-1/6">{{ tag._id }}</td>
          <td class="px-6 py-4 w-1/3">{{ tag.name[$i18n.locale] }}</td>
          <td class="px-6 py-4 w-1/3">{{ tag.description || '-' }}</td>
          <td class="px-6 py-4 text-center">
            <div class="flex justify-center space-x-3">
              <!-- View Detail Icon -->
              <button
                class="hover:text-blue-600 transition-colors duration-500 ease-in-out"
                @click="openDetail(tag)"
              >
                <viewIcon class="w-5 h-5 text-current" />
              </button>
              <!-- Edit Icon -->
              <button
                @click="openEditModal(tag)"
                class="hover:text-yellow-500 transition-colors duration-500 ease-in-out"
              >
                <editIcon class="w-5 h-5 text-current" />
              </button>
              <!-- Delete Icon -->
              <button
                @click="deleteTag(tag._id)"
                class="hover:text-red-500 transition-colors duration-500 ease-in-out"
              >
                <deleteIcon class="w-5 h-5 text-current" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Tag Modal -->
    <tagForm
      :show="showtagForm"
      :mode="editMode ? 'edit' : 'add'"
      :tag="tagToEdit"
      @tagAdded="handleTagAdded"
      @tagUpdated="handleTagUpdated"
      @close="closeModal"
    />

    <!-- Detail Modal -->
    <transition name="fade" mode="out-in">
      <div
        v-if="showDetailModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white px-10 py-6 rounded-lg w-full max-w-3xl h-auto overflow-hidden">
          <tagDetail :tagData="selectedTag" @close="closeDetailModal" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import viewIcon from '~/assets/icon/view.svg';
import deleteIcon from '~/assets/icon/delete.svg';
import editIcon from '~/assets/icon/edit.svg';
import tagForm from '~/components/tagForm.vue';
import tagDetail from '~/components/tagDetail.vue';

export default {
  name: 'Tags',
  components: {
    deleteIcon,
    editIcon,
    tagForm,
    viewIcon,
    tagDetail
  },
  data() {
    return {
      tags: [],
      searchQuery: '',
      showtagForm: false,
      editMode: false,
      tagToEdit: null,
      showDetailModal: false,
      selectedTag: null,
    };
  },
  computed: {
    filteredTags() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.tags.filter(tag => 
        tag._id.toLowerCase().includes(query) || // Search by ID
        tag.name.en.toLowerCase().includes(query) || // Search by English Name
        tag.name.th.toLowerCase().includes(query) // Search by Thai Name
      );
    },
  },
  methods: {
    async fetchTags() {
      try {
        const response = await this.$axios.get('/tags');
        this.tags = response.data;
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },
    async deleteTag(tagId) {
      if (confirm(this.$t('tags.alert.confirmDelete'))) {
        try {
          const response = await this.$axios.delete(`/tags/${tagId}`);
          this.tags = this.tags.filter(tag => tag._id !== tagId);
          this.$toast.success(this.$t(response.data.message)); // Display success message
        } catch (error) {
          if (error.response && error.response.data.message) {
            this.$toast.error(this.$t(error.response.data.message)); // Display error message
          } else {
            console.error('Error deleting tag:', error);
            this.$toast.error(this.$t('tags.alert.deleteError')); // Fallback error message
          }
        }
      }
    },
    handleTagAdded(newTag) {
      this.tags.push(newTag);
    },
    handleTagUpdated(updatedTag) {
      const index = this.tags.findIndex(tag => tag._id === updatedTag._id);
      if (index !== -1) {
        this.tags.splice(index, 1, updatedTag);
      }
    },
    openAddModal() {
      this.editMode = false;
      this.tagToEdit = null;
      this.showtagForm = true;
    },
    openEditModal(tag) {
      this.editMode = true;
      this.tagToEdit = {
        _id: tag._id,
        en: tag.name.en,
        th: tag.name.th,
        description: tag.description,
      };
      this.showtagForm = true;
    },
    openDetail(tag) {
      this.selectedTag = tag;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
      this.selectedTag = null;
    },
    closeModal() {
      this.showtagForm = false;
      this.editMode = false;
      this.tagToEdit = null;
    },
  },
  mounted() {
    this.fetchTags();
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
