<template>
  <div>
    <h3 class="text-2xl font-bold mb-3">{{ $t('suppliers.review') }}</h3>
    <div class="bg-gray-100 mb-5 rounded-lg p-4">
      <!-- Basic Information -->
      <h4 class="text-xl font-bold mb-1">{{ $t('suppliers.basicInfo') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.name')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.name }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.type')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.type }}</p>
        </div>
      </div>
      <div>
        <p class="text-gray-500 font-semibold">{{$t('suppliers.description')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.description }}</p>
      </div>
      <!-- Address -->
      <h4 class="mt-6 text-xl font-bold mb-1">{{ $t('suppliers.address') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="mb-2">
        <p class="text-gray-500 font-semibold">{{$t('suppliers.street')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.address.street }}</p>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-semibold">{{$t('suppliers.city')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.address.city }}</p>
      </div>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.state')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.address.state }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.zipcode')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.address.zipcode }}</p>
        </div>
      </div>
      <div>
        <p class="text-gray-500 font-semibold">{{$t('suppliers.country')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.address.country }}</p>
      </div>
      <!-- Contact Info -->
      <h4 class="mt-6 text-xl font-bold mb-1">{{ $t('suppliers.contact') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.phone')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.contact.phone }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.fax')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.contact.fax }}</p>
        </div>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-semibold">{{$t('suppliers.email')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.contact.email }}</p>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-semibold">{{$t('suppliers.website')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.contact.website }}</p>
      </div>
      <!-- Contact Person -->
      <h4 class="mt-6 text-xl font-bold mb-1">{{ $t('suppliers.contactPerson') }} : </h4>
      <hr class="w-full bg-gray-400 mb-4"/>
      <div class="mb-2">
        <p class="text-gray-500 font-semibold">{{$t('suppliers.contactPersonName')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.contactPerson.name }}</p>
      </div>
      <div class="mb-2">
        <p class="text-gray-500 font-semibold">{{$t('suppliers.contactPersonPosition')}}</p>
        <p class="font-semibold text-lg">{{ supplierData.contactPerson.position }}</p>
      </div>
      <div class="flex mb-2">
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.contactPersonPhone')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.contactPerson.phone }}</p>
        </div>
        <div class="w-1/2">
          <p class="text-gray-500 font-semibold">{{$t('suppliers.contactPersonEmail')}}</p>
          <p class="font-semibold text-lg">{{ supplierData.contactPerson.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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