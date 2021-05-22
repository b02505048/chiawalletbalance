import Vue from 'vue'
import { chiaExplorerInstance } from 'boot/axios'

export const chiaExplorerApi = {
    WALLET: {
        BALANCE: (address) => chiaExplorerInstance.get(`/balance/${address}`),
        RECORDS: (address, params) => chiaExplorerInstance.get(`/coinsForAddress/${address}`, { params })
    }
}