export const state = () => ({
  name: '',
})

export const mutations = {
  setPhotoName(state, payload) {
    state.name = payload
  },
}
