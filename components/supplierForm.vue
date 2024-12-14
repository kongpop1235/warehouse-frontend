<template>
  <transition name="fade" mode="out-in">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <!-- Steppers -->
        <div class="flex justify-center items-center mb-6">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
          >
            <!-- Set fixed width -->
            <div class="grid grid-rows-2 justify-items-center items-center w-32">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-300 ease-in-out"
                :class="{
                  'bg-blue-600 text-white': index === stepIndex,
                  'bg-gray-200 text-gray-500': index > stepIndex,
                  'bg-red-500 text-white': index < stepIndex && !step.validate,
                  'bg-green-500 text-white': index < stepIndex && step.validate,
                }"
              >
                {{ index + 1 }}
              </div>
              <p 
                class="text-sm text-center transition-colors duration-300 ease-in-out"
                :class="{
                  'text-blue-600': index === stepIndex,
                  'text-gray-500': index > stepIndex,
                  'text-red-500': index < stepIndex && !step.validate,
                  'text-green-500': index < stepIndex && step.validate,
                }"
              >
                {{ $t(step.name) }}
              </p>
            </div>
            <!-- Centered hr -->
            <div v-if="index < steps.length - 1" class="flex items-top">
              <hr class="w-20 bg-gray-400 -mt-4 -mx-10" />
            </div>
          </div>
        </div>

        <hr class="-mx-6"/>
        <!-- Step Content -->
        <div class="relative h-[450px] overflow-x-hidden">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="absolute top-0 px-1 left-0 w-full transition-transform duration-500"
            :style="{ transform: `translateX(${(index - stepIndex) * 100}%)` }"
          >
            <!-- Step 1: Basic Info -->
            <div v-if="stepIndex === 0" class="pt-6">
              <h3 class="text-2xl font-bold mb-3">{{ $t('suppliers.basicInfo') }}</h3>
              <!-- name Input -->
              <div class="mb-4">
                <p class="mb-1">{{$t('suppliers.name')}}</p>
                <div class="relative">
                  <input
                    v-model="supplierData.name"
                    maxlength="100"
                    type="text"
                    class="input-style w-full relative flex items-center"
                    :placeholder="$t('suppliers.name')"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {{ supplierData.name.length }}/100
                  </span>
                </div>
              </div>
              <!-- description Input -->
              <div class="relative">
                <p class="mb-1">{{$t('suppliers.description')}}</p>
                <textarea
                  v-model="supplierData.description"
                  maxlength="1000"
                  class="input-style w-full"
                  :placeholder="$t('suppliers.description')"
                ></textarea>
                <span class="block text-sm text-gray-400 text-right">
                  {{ supplierData.description.length }}/1000
                </span>
              </div>
              <div class="flex w-full gap-x-3">
                <div class="w-1/2">
                  <p class="mb-1">{{$t('suppliers.type')}}</p>
                  <multiselect
                    v-model="supplierData.type"
                    :options="typeOptions"
                    :multiple="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder=""
                    class="w-full"
                  />
                </div>
                <div
                  class="w-1/2" 
                  v-if="mode === 'edit'"
                >
                  <p class="mb-1">{{$t('suppliers.status')}}</p>
                  <multiselect
                    v-model="supplierData.status"
                    :options="typeStatus"
                    :multiple="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder=""
                    class="w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Step 2: Address -->
            <div v-if="stepIndex === 1" class="pt-6">
              <h3 class="text-2xl font-bold mb-3">{{ $t('suppliers.address') }}</h3>
              <!-- Street Input -->
              <div class="mb-4">
                <p class="mb-1">{{$t('suppliers.street')}}</p>
                <div class="relative">
                  <input
                    v-model="supplierData.address.street"
                    maxlength="250"
                    type="text"
                    class="input-style w-full"
                    :placeholder="$t('suppliers.street')"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {{ supplierData.address.street.length }}/250
                  </span>
                </div>
              </div>
              <div class="flex w-full gap-4 mb-4">
                <!-- City Input -->
                <div class="w-1/2">
                  <p class="mb-1">{{$t('suppliers.city')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.address.city"
                      maxlength="100"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.city')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.address.city.length }}/100
                    </span>
                  </div>
                </div>
                <!-- State Input -->
                <div class="w-1/2">
                  <p class="mb-1">{{$t('suppliers.state')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.address.state"
                      maxlength="100"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.state')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.address.state.length }}/100
                    </span>
                  </div>
                </div>
              </div>
              <!-- Zipcode Input -->
              <div class="flex w-full gap-4 mb-4">
                <div class="w-1/3">
                  <p class="mb-1">{{$t('suppliers.zipcode')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.address.zipcode"
                      maxlength="20"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.zipcode')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.address.zipcode.length }}/20
                    </span>
                  </div>
                </div>
              <!-- Country Input -->
                <div class="w-2/3">
                  <p class="mb-1">{{$t('suppliers.country')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.address.country"
                      maxlength="100"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.country')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.address.country.length }}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Contact Info -->
            <div v-if="stepIndex === 2" class="pt-6">
              <h3 class="text-2xl font-bold mb-3">{{ $t('suppliers.contact') }}</h3>
              <div class="flex w-full gap-4 mb-4">
                <!-- phone Input -->
                <div class="w-1/2">
                  <p class="mb-1">{{$t('suppliers.phone')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.contact.phone"
                      maxlength="20"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.phone')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.contact.phone.length }}/20
                    </span>
                  </div>
                </div>
                <!-- fax Input -->
                <div class="w-1/2">
                  <p class="mb-1">{{$t('suppliers.fax')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.contact.fax"
                      maxlength="20"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.fax')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.contact.fax.length }}/20
                    </span>
                  </div>
                </div>
              </div>
              <!-- email Input -->
              <div class="mb-4">
                <p class="mb-1">{{$t('suppliers.email')}}</p>
                <div class="relative">
                  <input
                    v-model="supplierData.contact.email"
                    maxlength="50"
                    type="email"
                    class="input-style w-full"
                    :placeholder="$t('suppliers.email')"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {{ supplierData.contact.email.length }}/50
                  </span>
                </div>
              </div>
              <!-- website Input -->
              <div class="relative">
                <p class="mb-1">{{$t('suppliers.website')}}</p>
                <div class="relative">
                  <input
                    v-model="supplierData.contact.website"
                    maxlength="250"
                    type="text"
                    class="input-style w-full"
                    :placeholder="$t('suppliers.website')"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {{ supplierData.contact.website.length }}/250
                  </span>
                </div>
              </div>
            </div>

            <!-- Step 4: Contact Person -->
            <div v-if="stepIndex === 3" class="pt-6">
              <h3 class="text-2xl font-bold mb-3">{{ $t('suppliers.contactPerson') }}</h3>
              <!-- Contact Person Name Input -->
              <div class="mb-4">
                <p class="mb-1">{{$t('suppliers.contactPersonName')}}</p>
                <div class="relative">
                  <input
                    v-model="supplierData.contactPerson.name"
                    maxlength="100"
                    type="text"
                    class="input-style w-full"
                    :placeholder="$t('suppliers.contactPersonName')"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {{ supplierData.contactPerson.name.length }}/100
                  </span>
                </div>
              </div>
              <!-- Contact Person Position Input -->
              <div class="mb-4">
                <p class="mb-1">{{$t('suppliers.contactPersonPosition')}}</p>
                <div class="relative">
                  <input
                    v-model="supplierData.contactPerson.position"
                    maxlength="100"
                    type="email"
                    class="input-style w-full"
                    :placeholder="$t('suppliers.contactPersonPosition')"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {{ supplierData.contactPerson.position.length }}/100
                  </span>
                </div>
              </div>
              <div class="flex w-full gap-4">
                <!-- Contact Person Phone Input -->
                <div class="mb-4 w-full">
                  <p class="mb-1">{{$t('suppliers.contactPersonPhone')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.contactPerson.phone"
                      maxlength="20"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.contactPersonPhone')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.contactPerson.phone.length }}/20
                    </span>
                  </div>
                </div>
                <!-- Contact Person Email Input -->
                <div class="relative w-full">
                  <p class="mb-1">{{$t('suppliers.contactPersonEmail')}}</p>
                  <div class="relative">
                    <input
                      v-model="supplierData.contactPerson.email"
                      maxlength="50"
                      type="text"
                      class="input-style w-full"
                      :placeholder="$t('suppliers.contactPersonEmail')"
                    />
                    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {{ supplierData.contactPerson.email.length }}/50
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 5: Review -->
            <div v-if="stepIndex === 4" class="pt-6">
              <detail
                :supplierData="supplierData"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between mt-6">
          <button
            v-if="stepIndex > 0"
            @click="previousStep"
            class="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            {{ $t('button.previous') }}
          </button>
          <button
            v-if="stepIndex < steps.length - 1"
            @click="nextStep"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg ml-auto"
          >
            {{ $t('button.next') }}
          </button>
          <button
            v-if="stepIndex === steps.length - 1"
            @click="handleSubmit"
            class="bg-green-600 text-white px-4 py-2 rounded-lg ml-auto"
            :disabled="!isAllStepsValid"
            :class="{ 'opacity-50 cursor-not-allowed': !isAllStepsValid }"
          >
            {{ mode === 'edit' ? $t('button.update') : $t('button.add') }}
          </button>

          <button
            @click="confirmCancel"
            class="bg-red-600 text-white px-4 py-2 rounded-lg ml-2"
          >
            {{ $t('button.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Multiselect from 'vue-multiselect';
import detail from '~/components/supplierDetail.vue'

export default {
  components: {
    Multiselect,
    detail
  },
  props: {
    show: Boolean,
    mode: {
      type: String,
      default: 'add',
    },
    supplier: {
      type: Object,
      default: () => ({
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
      }),
    },
  },
  data() {
    return {
      stepIndex: 0,
      steps: [{'name': 'suppliers.basicInfo', 'validate':false}, {'name':'suppliers.address', 'validate':false}, {'name':'suppliers.contact', 'validate':false}, {'name':'suppliers.contactPerson', 'validate':false}, {'name':'suppliers.review'}],
      supplierData: {
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
      },
    };
  },
  computed: {
    typeOptions() {
      return [
        this.$t('suppliers.typeManufacturer'),
        this.$t('suppliers.typeDistributor'),
        this.$t('suppliers.typeWholesaler'),
      ];
    },
    typeStatus() {
      return [
        this.$t('suppliers.statusActive'),
        this.$t('suppliers.statusInactive'),
      ];
    },
    isAllStepsValid() {
      return this.steps.slice(0, -1).every(step => step.validate === true);
    },
  },

  watch: {
    supplier: {
      immediate: true,
      handler(newValue) {
        if (this.mode === 'edit') {
          this.supplierData = { ...newValue };
        }
      },
    },
  },
  methods: {
    nextStep() {
      if (this.stepIndex < this.steps.length - 1) {
        this.stepIndex++;
      }

      //Check input
      if (this.stepIndex === 1) {
      // Step 0: Basic Info
        if (
          this.supplierData.name.trim() !== "" &&
          this.supplierData.description.trim() !== "" &&
          this.supplierData.type.trim() !== ""
        ) {
            this.steps[0].validate = true;
        } else {
          this.steps[0].validate = false;
        }
      } else if (this.stepIndex === 2) {
        // Step 1: Address
        if (
          this.supplierData.address.street.trim() !== "" &&
          this.supplierData.address.city.trim() !== "" &&
          this.supplierData.address.state.trim() !== "" &&
          this.supplierData.address.zipcode.trim() !== "" &&
          this.supplierData.address.country.trim() !== ""
        ) {
          this.steps[1].validate = true;
        } else {
          this.steps[1].validate = false;
        }
      } else if (this.stepIndex === 3) {
        // Step 2: Contact Info
        if (
          this.supplierData.contact.phone.trim() !== "" &&
          this.supplierData.contact.email.trim() !== ""
        ) {
          this.steps[2].validate = true;
        } else {
          this.steps[2].validate = false;
        }
      } else if (this.stepIndex === 4) {
        // Step 3: Contact Person
        if (
          this.supplierData.contactPerson.name.trim() !== "" &&
          this.supplierData.contactPerson.position.trim() !== "" &&
          this.supplierData.contactPerson.phone.trim() !== "" &&
          this.supplierData.contactPerson.email.trim() !== ""
        ) {
          this.steps[3].validate = true;
        } else {
          this.steps[3].validate = false;
        }
      } else if (this.stepIndex === 5) {
        // Step 4: Review
        // No additional validation needed for review
        this.steps[4].validate = true;
      }
    },
    previousStep() {
      if (this.stepIndex > 0) {
        this.stepIndex--;
      }
    },
    async handleSubmit() {
      try {
        if (this.mode === 'edit') {
          const res = await this.$axios.put(`/suppliers/${this.supplierData._id}`, this.supplierData);
          this.$emit('supplierUpdated', res.data);
        } else {
          const res = await this.$axios.post('/suppliers', this.supplierData);
          this.$emit('supplierAdded', res.data);
        }
        this.$emit('close');
      } catch (error) {
        console.error('Error submitting supplier data:', error);
      }
    },
    confirmCancel() {
      if (confirm(this.$t('alert.confirmCancel.detail'))) {
        this.$emit('close');
        this.stepIndex = 0;
        this.supplierData = {
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
    },
  },
};
</script>

<style scoped>
.input-style {
  @apply border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 focus:border-blue-500;
}

p {
  font-weight: 600;
}

</style>