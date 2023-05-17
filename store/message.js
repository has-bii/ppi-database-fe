export const state = () => ({
  message: '',
  error: '',
})

export const mutations = {
  setMessage(state, payload) {
    state.message = payload
  },
  setError(state, payload) {
    state.error = payload
  },
}
