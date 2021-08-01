import Vue from 'vue'
import { chiaExplorerInstance } from 'boot/axios'

export const chiaExplorerApi = {
    WALLET: {
        BALANCE: (params) => chiaExplorerInstance.get(`/account/balance`, { params }),
        RECORDS: (params) => chiaExplorerInstance.get(`/account/txns`, { params })
    }
}