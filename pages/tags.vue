<template>
  <div class="p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{$t('navbar.manageTags')}}</h1>
    
    <!-- Search Input -->
    <div class="flex items-center justify-between mb-4">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by ID or Name"
        class="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:ring focus:ring-blue-300 focus:border-blue-500"
      />
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
  </div>
</template>

<script>
import deleteIcon from '~/assets/icon/delete.svg';

export default {
  name: 'Tags',
  components: {
    deleteIcon,
  },
  data() {
    return {
      tags: [], // All tags fetched from the API
      searchQuery: '', // Search input value
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
      if (confirm(this.$t('tags.confirmDelete'))) {
        try {
          await this.$axios.delete(`/tags/${tagId}`);
          this.tags = this.tags.filter(tag => tag._id !== tagId);
        } catch (error) {
          console.error('Error deleting tag:', error);
        }
      }
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
