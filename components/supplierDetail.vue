<template>
  <div class="h-full">
    <div class="flex items-center mb-3 gap-3">
      <viewIcon class="w-8 h-8 p-1 text-white rounded-md bg-gray-500 "/>
      <h3 class="text-2xl font-bold">{{ $t('suppliers.review') }}</h3>
    </div>
    <div class="bg-gray-100 mb-5 rounded-lg p-4 overflow-y-auto h-full">
      <!-- Basic Information -->
      <h4 class="text-xl font-bold mb-1">{{ $t('suppliers.basicInfo') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.name')}}</p>
          <p class="font-medium text-base">{{ supplierData.name }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.type')}}</p>
          <p class="font-medium text-base">{{ supplierData.type }}</p>
        </div>
      </div>
      <div>
        <p class="text-gray-500 font-light">{{$t('suppliers.description')}}</p>
        <p class="font-medium text-base">{{ supplierData.description }}</p>
      </div>
      <!-- Address -->
      <h4 class="mt-6 text-xl font-bold mb-1">{{ $t('suppliers.address') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="mb-2">
        <p class="text-gray-500 font-light">{{$t('suppliers.street')}}</p>
        <p class="font-medium text-base">{{ supplierData.address.street }}</p>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-light">{{$t('suppliers.city')}}</p>
        <p class="font-medium text-base">{{ supplierData.address.city }}</p>
      </div>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.state')}}</p>
          <p class="font-medium text-base">{{ supplierData.address.state }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.zipcode')}}</p>
          <p class="font-medium text-base">{{ supplierData.address.zipcode }}</p>
        </div>
      </div>
      <div>
        <p class="text-gray-500 font-light">{{$t('suppliers.country')}}</p>
        <p class="font-medium text-base">{{ supplierData.address.country }}</p>
      </div>
      <!-- Contact Info -->
      <h4 class="mt-6 text-xl font-bold mb-1">{{ $t('suppliers.contact') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.phone')}}</p>
          <p class="font-medium text-base">{{ supplierData.contact.phone }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.fax')}}</p>
          <p class="font-medium text-base">{{ supplierData.contact.fax }}</p>
        </div>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-light">{{$t('suppliers.email')}}</p>
        <p class="font-medium text-base">{{ supplierData.contact.email }}</p>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-light">{{$t('suppliers.website')}}</p>
        <p class="font-medium text-base">{{ supplierData.contact.website }}</p>
      </div>
      <!-- Contact Person -->
      <h4 class="mt-6 text-xl font-bold mb-1">{{ $t('suppliers.contactPerson') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="mb-2">
        <p class="text-gray-500 font-light">{{$t('suppliers.contactPersonName')}}</p>
        <p class="font-medium text-base">{{ supplierData.contactPerson.name }}</p>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-light">{{$t('suppliers.contactPersonPosition')}}</p>
        <p class="font-medium text-base">{{ supplierData.contactPerson.position }}</p>
      </div>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.contactPersonPhone')}}</p>
          <p class="font-medium text-base">{{ supplierData.contactPerson.phone }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-light">{{$t('suppliers.contactPersonEmail')}}</p>
          <p class="font-medium text-base">{{ supplierData.contactPerson.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import viewIcon from '~/assets/icon/view.svg';
  export default {
    components: {
      viewIcon
    },
    props: {
      supplierData: {
        type: Object,
        default: {
        name: '',
        description: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
        },
        contact: {
          phone: '',
          email: '',
          website: '',
          fax: '',
        },
        contactPerson: {
          name: '',
          position: '',
          phone: '',
          email: '',
        },
        type: '',
        status: 'Active',
      }
      }
    }
  }
</script>

<style>

</style>