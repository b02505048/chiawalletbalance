export const filters = {
    mojo: (val) => {
        return parseFloat(val / 1000000000000.0).toFixed(12)
    },

    formatDate: (val) => {
        if (!val) return ''

        const multiplier = String(val).length === 10 ? 1000 : 1
        let newVal = val * multiplier
        let date = new Date(newVal)
        return date.toLocaleString()
    },

    concat32Bits: (val) => {
        if (!val) return ''

        let newVal = `${val.substring(0, 32)}...`
        return newVal
    }
}

export default ({Vue}) => {
    for(let key in filters) {
        Vue.filter(key, filters[key])
    }
}