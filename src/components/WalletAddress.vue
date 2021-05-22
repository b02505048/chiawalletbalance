<template>
  <q-card class="q-my-sm">
    <q-card-section>
      <q-input 
        dense
        borderless
        v-model.trim="userAddress"
        @keydown.enter.prevent="checkBalance()"
        placeholder="Paste your Chia wallet public address here."
        :loading="loading.wallet"
      >
        <template v-slot:prepend>
          <q-icon name="account_balance_wallet" class="q-mr-sm" />
        </template>
        <template v-slot:append>
          <q-btn 
            v-if="!loading.wallet"
            flat
            round
            icon="search" 
            @click="checkBalance()"
          />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WalletAddress',

  computed: {
    ...mapState({
      address: (state) => state.wallet.address,
      balance: (state) => state.wallet.balance,
      loading: (state) => state.utils.loading
    }),
  },

  data() {
    return {
      userAddress: this.address,
    }
  },

  methods: {
    async checkBalance() {
      if (!!this.userAddress && this.userAddress.startsWith('xch')) {
        this.$q.cookies.set('userAddress', this.userAddress, { expires: '303d' })

        await this.$store.dispatch('wallet/fetchBalance', this.userAddress)
        this.$q.cookies.set('grossBalance', this.balance.grossBalance, { expires: '1d'})
        this.$q.cookies.set('netBalance', this.balance.grossBalance, { expires: '1d'})

        await this.$store.dispatch('wallet/fetchRecords', this.userAddress)
      }
    }
  },

  async mounted() {
    if (this.$q.cookies.has('userAddress')) {
      await this.$store.dispatch('wallet/setAddress', this.$q.cookies.get('userAddress'))
      this.userAddress = this.address
    }
  }
}
</script>

<style>

</style>
