<template>
    <PageTemplate class="page" title="Tenant contracts">
      <template slot="header-actions">
        <BaseTextfield v-model="search" placeholder="Search" />
        <BaseTooltip
            @button="showCreateContractModal = true"
            message="Create new contract"
            icon="plus"
            color="black"
        />
      </template>
      <template slot="body">
        <div class="table_display">
            <div class="contracts_display">
                <Table>
                    <template slot="header">
                        <tr>
                            <th>#</th>
                            <th>Full name</th>
                            <th>Property</th>
                            <th>Unit No.</th>
                            <th>Agreed Rent</th>
                            <th>Payment mode</th>
                            <th>Moved In</th>
                            <th>&nbsp;</th>
                        </tr>
                    </template>
                    <template slot="body">
                        <tr v-for="contract in contracts" :key="`contract${contract.contract_id}`">
                            <td>{{ contract.contract_id }}</td>
                            <td>{{ contract.full_name }}</td>
                            <td>{{ contract.property_name }}</td>
                            <td>{{ contract.unit_name }}</td>
                            <td>{{ contract.monthly_rent_agreed }}</td>
                            <td>Monthly</td>
                            <td>{{ contract.check_in_date }}</td>
                            <td>
                                <BaseTooltip
                                    @button="showContractInfo(contract)"
                                    message="View contract details"
                                    icon="information"
                                />
                            </td>
                        </tr>
                    </template>
                </Table>
            </div>
            <div class="base_switcher">
                <div class="text-center">
                    <v-pagination
                    v-if="paginationLength > 1"
                    v-model="page"
                    :length="paginationLength"
                    ></v-pagination>
                </div>
            </div>
        </div>
        <CreateNewContractModal
            v-if="showCreateContractModal"
            @close="fetchContracts"
        />
        <ViewContractInformationModal
            v-if="viewContractInfo && selectedContract"
            :contract="selectedContract"
            @close="viewContractInfo = false"
            @add-payment="createPayment = true"
        />
        <AddNewRentalPayment
            v-if="createPayment && selectedContract"
            :contract="selectedContract"
            @close="createPayment = false"
        />
      </template>
    </PageTemplate>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Table from '@/components/generics/new/Table.vue';
import PageTemplate from '@/views/estates/PageTemplate.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import AddNewRentalPayment from '@/components/estates/contracts/AddNewRentalPayment.vue';
import CreateNewContractModal from '@/components/estates/CreateNewContractModal.vue';
import ViewContractInformationModal from '@/components/estates/contracts/ViewContractInformationModal.vue';

export default {
  name: 'Contracts',
  components: {
    PageTemplate,
    BaseTextfield,
    Table,
    BaseTooltip,
    CreateNewContractModal,
    ViewContractInformationModal,
    AddNewRentalPayment,
  },
  data() {
    return {
      page: 1,
      showCreateContractModal: false,
      search: '',
      contracts: [],
      selectedContract: null,
      viewContractInfo: false,
      createPayment: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    paginationLength() {
      return Math.ceil(this.contracts.length / 13);
    },
  },
  created() {
    this.$nextTick(async () => {
      if (this.user) await this.fetchContracts();
    });
  },
  methods: {
    ...mapActions('estates', ['post']),

    showContractInfo(contract) {
      this.selectedContract = contract;
      this.viewContractInfo = true;
    },

    async fetchContracts() {
      this.showCreateContractModal = false;
      const CONTRACTS = await this.post(
        {
          company_id: this.user.company_id,
          fetch_contracts: 'all',
          top: this.page * 13,
        },
      );
      this.contracts = CONTRACTS.data;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.page {
    overflow: hidden !important;
}

.table_display {
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .contracts_display {
        height: calc(100vh - 163px);
        overflow-y: auto;
    }

    .base_switcher {
        height: 56px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-top: 0.3px solid $border-color;
    }
}
</style>
