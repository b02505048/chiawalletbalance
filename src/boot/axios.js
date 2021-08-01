import Vue from 'vue'
import axios from 'axios'

// Chia Explorer API
export const chiaExplorerInstance = axios.create({
    baseURL: process.env.CHIA_XCHSCAN_URL
})

Vue.prototype.$axios = axios
