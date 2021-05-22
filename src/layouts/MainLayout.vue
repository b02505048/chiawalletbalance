<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated :class="$q.dark.isActive ? 'bg-primary': 'bg-primary'">
      <q-toolbar>
        <q-avatar square size="20px">
          <img src="/icons/favicon-128x128.png">
        </q-avatar>

        <q-toolbar-title>
          Chia Wallet Balance
        </q-toolbar-title>

        <q-btn
          flat
          round
          :icon="$q.dark.isActive ? 'brightness_5' : 'brightness_4'"
          :text-color="$q.dark.isActive ? 'white': 'secondary'"
          @click="setDarkMode"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-toolbar>
        <div class="full-width row justify-end text-overline">
          <span>Copyright ©{{ thisYear }} | Code by VG with ♥ |&nbsp;</span>
          <span class="clickable" @click="credit">API by ChiaExplorer</span>
        </div>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  methods: {
    credit() {
      window.open('https://www.chiaexplorer.com/api/v0.1')
    },

    setDarkMode() {
      this.$q.dark.toggle()
      this.$q.cookies.set('is_dark', this.$q.dark.isActive, { expires: '303d' })
    }
  },

  computed: {
    thisYear() {
      return new Date().getFullYear()
    }
  },

  created() {
    if (this.$q.cookies.has('is_dark')) {
      this.$q.dark.set(this.$q.cookies.get('is_dark'), { expires: '303d' })
    }
  }
}
</script>
