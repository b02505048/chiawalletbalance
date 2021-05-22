<template>
  <q-page class="q-ma-md">
    <wallet-address />
    <wallet-balance />
    <wallet-records />
  </q-page>
</template>

<script>
import WalletAddress from 'src/components/WalletAddress.vue'
import WalletBalance from 'src/components/WalletBalance.vue'
import WalletRecords from 'src/components/WalletRecords.vue'

export default {
  name: 'Home',

  components: {
    WalletAddress,
    WalletBalance,
    WalletRecords
  }
}
</script>
