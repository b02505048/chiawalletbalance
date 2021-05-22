<template>
  <q-table
    virtual-scroll
    :dense="$q.screen.lt.md"
    title="Records"
    :data="records"
    :columns="columns"
    row-key="coin_id"
    class="q-my-sm"
    :rows-per-page-options="[25]"
    :loading="loading.wallet"
  >
    <template v-slot:top-right>
      <q-btn flat round icon="cached" @click="refreshRecords()" />
    </template>
    
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td 
          key="coin_id"
          :props="props"
          class="clickable"
          @click="viewDetail(props.row)"
        >
          {{ props.row.coin_id | concat32Bits }}
        </q-td>

        <q-td key="amount" :props="props">
          {{ props.row.amount | mojo }}
        </q-td>

        <q-td key="block_height" :props="props">
          {{ props.row.block_height }}
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
        {
          name: 'coin_id',
          align: 'left',
          label: 'Coin',
          field: 'coin_id',
          style: 'width: 40px',
          headerStyle: 'width: 40px'
        },
        {
          name: 'amount',
          align: 'center',
          label: 'Amount',
          field: 'amount'
        },
        {
          name: 'block_height',
          align: 'center',
          label: 'Height',
          field: 'block_height'
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

    viewDetail(row) {
      let link = `https://www.chiaexplorer.com/blockchain/coin/${row.coin_id}`
      window.open(link)
    }
  }
}
</script>

<style>

</style>
