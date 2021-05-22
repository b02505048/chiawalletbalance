/*
export function someMutation (state) {
}
*/

export const onLoading = (state, key) => {
    state.loading = Object.assign({}, state.loading, { [key]: true })
}


export const offLoading = (state, key) => {
    state.loading = Object.assign({}, state.loading, { [key]: false })
}