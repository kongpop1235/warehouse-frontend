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
          <th class="px-6 py-3 text-center w-1/6">{{$t('tags.actions')}}</th> <!-- Actions -->
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
          <td class="px-6 py-4 text-center w-1/6">
            <!-- Edit Icon -->
            <button
              @click="openEditModal(tag)"
              class="hover:text-yellow-500 transition-colors mr-2"
            >
              <editIcon class="w-5 h-5 text-current" />
            </button>
            <!-- Delete Icon -->
            <button
              @click="deleteTag(tag._id)"
              class="hover:text-red-500 transition-colors"
            >
              <deleteIcon class="w-5 h-5 text-current" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Tag Modal -->
    <tagModal
      :show="showTagModal"
      :mode="editMode ? 'edit' : 'add'"
      :tag="tagToEdit"
      @tagAdded="handleTagAdded"
      @tagUpdated="handleTagUpdated"
      @close="closeModal"
    />
  </div>
</template>

<script>
import deleteIcon from '~/assets/icon/delete.svg';
import editIcon from '~/assets/icon/edit.svg';
import tagModal from '~/components/tagModal.vue';

export default {
  name: 'Tags',
  components: {
    deleteIcon,
    editIcon,
    tagModal,
  },
  data() {
    return {
      tags: [], // All tags fetched from the API
      searchQuery: '', // Search input value
      showTagModal: false, // Control tag modal visibility
      editMode: false, // Determine if it's an add or edit action
      tagToEdit: null, // Data of the tag being edited
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
          alert(this.$t(response.data.message)); // Display success message
        } catch (error) {
          if (error.response && error.response.data.message) {
            alert(this.$t(error.response.data.message)); // Display error message
          } else {
            console.error('Error deleting tag:', error);
            alert(this.$t('tags.alert.deleteError')); // Fallback error message
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
      this.showTagModal = true;
    },
    openEditModal(tag) {
      this.editMode = true;
      this.tagToEdit = {
        _id: tag._id,
        en: tag.name.en,
        th: tag.name.th,
        description: tag.description,
      };
      this.showTagModal = true;
    },
    closeModal() {
      this.showTagModal = false;
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
