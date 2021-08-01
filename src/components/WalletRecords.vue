<template>
  <q-table
    virtual-scroll
    :dense="$q.screen.lt.md"
    title="Records"
    :data="records"
    :columns="columns"
    row-key="block.height"
    class="q-my-sm"
    :rows-per-page-options="[25]"
    :loading="loading.wallet"
  >
    <template v-slot:top-right>
      <q-btn flat round icon="cached" @click="refreshRecords()" />
    </template>
    
    <template v-slot:body="props">
      <q-tr :props="props">
        <!-- <q-td 
          key="id"
          :props="props"
          class="clickable"
          @click="viewDetail(props.row)"
        >
          {{ props.row.id | concat32Bits }}
        </q-td> -->

        <q-td 
          key="block_height"
          :props="props"
          class="clickable"
          @click="viewDetail(props.row.block)"
        >
          {{ props.row.block.height }}
        </q-td>

        <q-td key="amount" :props="props">
          {{ props.row.amount | mojo }}
        </q-td>

        <q-td 
          key="from"
          :class="{ clickable: props.row.from !== $q.cookies.get('userAddress') }"
          :props="props"
          @click="viewAddress(props.row.from)"
        >
          {{ props.row.from | concatXCHAddress }}
        </q-td>

        <q-td 
          key="to"
          :class="{ clickable: props.row.to !== $q.cookies.get('userAddress') }"
          :props="props"
          @click="viewAddress(props.row.to)"
        >
          {{ props.row.to | concatXCHAddress }}
        </q-td>

        <q-td key="date" :props="props">
          {{ props.row.timestamp | formatDate }}
        </q-td>
      </q-tr>
    </template>

    <template v-slot:no-data>
      <div class="full-width col flex-center q-my-xl q-gutter-md">
        <div class="full-width row flex-center">
          <q-icon size="30px" class="text-secondary" name="spa" />
          <q-icon size="30px" class="text-secondary" name="spa" />
          <q-icon size="30px" class="text-secondary" name="spa" />
        </div>
        <div class="full-width row flex-center text-secondary">
          Fetch the latest 25 Chia records
        </div>
        <div class="full-width row flex-center">
          <q-btn 
            :loading="loading.wallet"
            label="Fetch"
            color="primary"
            no-caps
            @click="refreshRecords()"
          />
        </div>
      </div>
    </template>
  </q-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WalletRecords',

  computed: {
    ...mapState({
      records: (state) => state.wallet.records,
      loading: (state) => state.utils.loading
    }),
  },

  data() {
    return {
      columns: [
        // {
        //   name: 'id',
        //   align: 'left',
        //   label: 'Coin',
        //   field: 'id',
        //   style: 'width: 40px',
        //   headerStyle: 'width: 40px'
        // },
        {
          name: 'block_height',
          align: 'center',
          label: 'Height',
          field: 'block.height'
        },
        {
          name: 'amount',
          align: 'right',
          label: 'Amount',
          field: 'amount'
        },
        {
          name: 'from',
          align: 'center',
          label: 'From',
          field: 'from'
        },
        {
          name: 'to',
          align: 'center',
          label: 'To',
          field: 'to'
        },
        {
          name: 'date',
          align: 'center',
          label: 'Date',
          field: 'timestamp'
        }
      ]
    }
  },

  methods: {
    async refreshRecords() {
      if (this.$q.cookies.has('userAddress')) {
        await this.$store.dispatch('wallet/fetchBalance', this.$q.cookies.get('userAddress'))
        await this.$store.dispatch('wallet/fetchRecords', this.$q.cookies.get('userAddress'))
      }
    },

    viewAddress(addr) {
      let link = `https://www.chiaexplorer.com/blockchain/address/${addr}`
      window.open(link)
    },

    viewDetail(block) {
      // let link = `https://www.chiaexplorer.com/blockchain/coin/${row.id}`
      let link = `https://www.chiaexplorer.com/blockchain/block/height/${block.height}`
      window.open(link)
    }
  }
}
</script>

<style>

</style>
