<template>
  <q-card>
    <q-card-section>
      <q-list>
        <q-item clickable>
          <q-item-section>
            <q-item-label>Gross Balance</q-item-label>
            <q-item-label caption>Total XCH received</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>XCH</q-item-label>
            <!-- <div class="text-h6">{{ balance.grossBalance / 1000000000000 }}</div> -->
            <q-input
              dense
              borderless
              readonly
              class="q-pa-none"
              v-model="grossBalance"
              input-class="text-right"
              :loading="loading.wallet"
            />
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-label>Net Balance</q-item-label>
            <q-item-label caption>Total XCH remaining</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>XCH</q-item-label>
            <!-- <div class="text-h6">{{ balance.netBalance / 1000000000000 }}</div> -->
            <q-input
              dense
              borderless
              readonly
              class="q-pa-none"
              v-model="netBalance"
              input-class="text-right"
              :loading="loading.wallet"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WalletBalance',

  computed: {
    ...mapState({
      balance: (state) => state.wallet.balance,
      loading: (state) => state.utils.loading
    }),

    grossBalance() {
      const { grossBalance } = this.balance
      if (!!grossBalance)
        return this.$options.filters.mojo(grossBalance)
      return 0
    },

    netBalance() {
      const { netBalance } = this.balance
      if (!!netBalance)
        return this.$options.filters.mojo(netBalance)
      return 0
    },
  },

  async mounted() {
    if (this.$q.cookies.has('grossBalance')) await this.$store.dispatch('wallet/setGrossBalance', this.$q.cookies.get('grossBalance'))
    if (this.$q.cookies.has('netBalance')) await this.$store.dispatch('wallet/setNetBalance', this.$q.cookies.get('netBalance'))
  }
}
</script>

<style>

</style>
