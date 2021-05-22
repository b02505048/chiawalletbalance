
import { chiaExplorerApi } from 'src/helpers/api'

/**
 * Set the Chia Wallet Address
 * @param address
 */
export const setAddress = ({commit}, address) => {
    commit('utils/onLoading', 'wallet', {root: true})
    commit('setAddress', address)
    commit('utils/offLoading', 'wallet', {root: true})
}


/**
 * Set the previous gross balance
 * @param grossBalance 
 */
export const setGrossBalance = ({commit}, grossBalance) => {
    commit('utils/onLoading', 'wallet', {root: true})
    commit('setGrossBalance', grossBalance)
    commit('utils/offLoading', 'wallet', {root: true})
}


/**
 * Set the previous net balance
 * @param netBalance 
 */
export const setNetBalance = ({commit}, netBalance) => {
    commit('utils/onLoading', 'wallet', {root: true})
    commit('setNetBalance', netBalance)
    commit('utils/offLoading', 'wallet', {root: true})
}

/**
 * Call Chia Explorer API to fetch the balance
 * @param address
 */
export const fetchBalance = async ({commit}, address) => {
    commit('utils/onLoading', 'wallet', {root: true})
    try {
        const { data: res } = await chiaExplorerApi.WALLET.BALANCE(address)
        console.log(res)
        commit('fetchBalance', res)
    } catch (err) {
        console.log(err)
    }
    commit('utils/offLoading', 'wallet', {root: true})
}


/**
 * Call Chia Explorer API to fetch the transaction history
 * @param address 
 * @queryString page
 */
export const fetchRecords = async ({commit}, address) => {
    commit('utils/onLoading', 'wallet', {root: true})
    try {
        let queryString = {
            page: 1
        }
        const { data: res } = await chiaExplorerApi.WALLET.RECORDS(address, queryString)
        console.log(res)
        commit('fetchRecords', res)
    } catch (err) {
        console.log(err)
    }
    commit('utils/offLoading', 'wallet', {root: true})
}
