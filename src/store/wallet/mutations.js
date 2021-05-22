import Vue from 'vue'

/*
export function someMutation (state) {
}
*/
export const setAddress = (state, address) => {
    state.address = address
}

export const setGrossBalance = (state, grossBalance) => {
    Vue.set(state.balance, 'grossBalance', grossBalance)
}

export const setNetBalance = (state, netBalance) => {
    Vue.set(state.balance, 'netBalance', netBalance)
}

export const fetchBalance = (state, payload) => {
    state.balance = payload
}

export const fetchRecords = (state, payload) => {
    const { coins } = payload
    state.records = coins
}