<template>
  <div class="p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{$t('navbar.manageSuppliers')}}</h1>

    <!-- Search Input and Add Button -->
    <div class="flex items-center justify-between mb-4">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Name or ID"
        class="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:ring focus:ring-blue-300 focus:border-blue-500"
      />

      <!-- Add Supplier Button -->
      <button
        @click="showAddSupplierModal = true"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
      >
        {{$t('suppliers.addSupplier')}}
      </button>
    </div>

    <!-- Suppliers List -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3 w-1/6">ID</th>
          <th class="px-6 py-3 w-1/3">{{$t('suppliers.name')}}</th>
          <th class="px-6 py-3 w-1/6">{{$t('suppliers.type')}}</th>
          <th class="px-6 py-3 w-1/6">{{$t('suppliers.status')}}</th>
          <th class="px-6 py-3 text-center w-1/6">{{$t('suppliers.actions')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="supplier in filteredSuppliers"
          :key="supplier._id"
          class="bg-white border-b hover:bg-gray-100 cursor-pointer"
        >
          <td class="px-6 py-4">{{ supplier._id }}</td>
          <td class="px-6 py-4">{{ supplier.name }}</td>
          <td class="px-6 py-4">{{ supplier.type }}</td>
          <td class="px-6 py-4">
            <span
              class="px-2 py-1 rounded text-white"
              :class="supplier.status === 'Active' ? 'bg-green-500' : 'bg-red-500'"
            >
              {{ supplier.status }}
            </span>
          </td>
          <td class="px-6 py-4 text-center flex justify-center items-center gap-x-3 ">
            <viewIcon class="w-5 h-5 text-current cursor-pointer hover:text-blue-600 transition-colors duration-500 ease-in-out" @click="viewDetail(supplier)"/>
            <!-- <editIcon class="w-5 h-5 text-current hover:text-yellow-600 transition-colors duration-500 ease-in-out" @click="openEditModal(supplier)"/> -->
            <deleteIcon class="w-5 h-5 text-current hover:text-red-600 transition-colors duration-500 ease-in-out" @click="deleteSupplier(supplier._id)"/>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Supplier Modal -->
    <supplierModal
        :show="showAddSupplierModal"
        :mode="editMode ? 'edit' : 'add'"
        :supplier="supplierToEdit"
        @supplierAdded="handleSupplierAdded"
        @supplierUpdated="handleSupplierUpdated"
        @close="showAddSupplierModal = false"
    />

    <!-- Detail Popup -->
    <transition name="fade" mode="out-in">
  <div v-if="showDetail" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 py-20">
    <div 
      class="bg-white px-10 pt-4 pb-5 rounded-lg shadow-lg w-full max-w-3xl h-full"
    >
      <div class="h-[calc(100%-50px)] py-10">
        <detail :supplierData="selectedSupplier" @close="closeDetail" />
      </div>
      <div class="flex justify-end mt-4">
        <button
          @click="closeDetail"
          class="bg-red-600 text-white px-4 py-2 rounded-lg ml-2"
        >
          {{ $t('button.cancel') }}
        </button>
      </div>
    </div>
  </div>
</transition>
  </div>
</template>

<script>
import viewIcon from '~/assets/icon/view.svg';
import editIcon from '~/assets/icon/edit.svg';
import deleteIcon from '~/assets/icon/delete.svg';
import supplierModal from '~/components/supplierModal.vue';
import detail from '~/components/supplierDetail.vue'

export default {
  name: 'Suppliers',
  components: {
    viewIcon,
    editIcon,
    deleteIcon,
    supplierModal,
    detail
  },
  data() {
    return {
      suppliers: [],
      searchQuery: '',
      showAddSupplierModal: false,
      editMode: false,
      supplierToEdit: null,
      showDetail: false,
      selectedSupplier: null,
    };
  },
  computed: {
    filteredSuppliers() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.suppliers.filter(supplier =>
        supplier._id.toLowerCase().includes(query) || // Filter by ID
        supplier.name.toLowerCase().includes(query)   // Filter by Name
      );
    },
  },
  methods: {
    async fetchSuppliers() {
      try {
        const response = await this.$axios.get('/suppliers'); // Fetch data from API
        this.suppliers = response.data;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    },
    handleSupplierAdded(newSupplier) {
      console.log(newSupplier)
      this.suppliers.push(newSupplier);
    },
    openEditModal(supplier) {
      this.supplierToEdit = supplier;
      this.editMode = true;
      this.showAddSupplierModal = true;
    },
    handleSupplierUpdated(updatedSupplier) {
      const index = this.suppliers.findIndex(sup => sup._id === updatedSupplier._id);
      if (index !== -1) {
        this.suppliers.splice(index, 1, updatedSupplier);
      }
    },
    async deleteSupplier(supplierId) {
      if (confirm(this.$t('alert.confirmDelete.suppliers.confirmDelete'))) {
        try {
          await this.$axios.delete(`/suppliers/${supplierId}`);
          this.suppliers = this.suppliers.filter(supplier => supplier._id !== supplierId);
          alert(this.$t('alert.confirmDelete.suppliers.deleteSuccess'));
        } catch (error) {
          console.error('Error deleting supplier:', error);
          alert(this.$t('alert.confirmDelete.suppliers.deleteError'));
        }
      }
    },
    viewDetail(supplier) {
      this.selectedSupplier = supplier;
      this.showDetail = true;
    },
    closeDetail() {
      this.selectedSupplier = null;
      this.showDetail = false;
    },
  },
  mounted() {
    this.fetchSuppliers();
  },
};
</script>

<style scoped>
/* No custom styles needed, everything handled by Tailwind CSS */
</style>