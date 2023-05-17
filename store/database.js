export const state = () => ({
  name: '',
  email: '',
  jenis_kelamin: '',
  agama: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  provinsi_indonesia: '',
  kota_asal_indonesia: '',
  alamat_lengkap_indonesia: '',
  tempat_tinggal: '',
  kota_turki_id: '',
  kota_turki_selected: '',
  alamat_turki: '',
  whatsapp: '',
  no_aktif: '',
  tahun_masuk: '',
  ppi_id: '',
  ppi_selected: '',
  no_ikamet: '',
  universitas_turki_id: '',
  universitas_turki_selected: '',
  jurusan_id: '',
  jurusan_selected: '',
  jenjang_pendidikan: '',
  tahun_ke: '',
})

export const mutations = {
  updateName(state, payload) {
    state.name = payload
  },
  updateEmail(state, payload) {
    state.email = payload
  },
  updateJenis_kelamin(state, payload) {
    state.jenis_kelamin = payload
  },
  updateAgama(state, payload) {
    state.agama = payload
  },
  updateTempat_lahir(state, payload) {
    state.tempat_lahir = payload
  },
  updateTanggal_lahir(state, payload) {
    state.tanggal_lahir = payload
  },
  updateProvinsi_indonesia(state, payload) {
    state.provinsi_indonesia = payload
  },
  updateKota_asal_indonesia(state, payload) {
    state.kota_asal_indonesia = payload
  },
  updateAlamat_lengkap_indonesia(state, payload) {
    state.alamat_lengkap_indonesia = payload
  },
  updateTempat_tinggal(state, payload) {
    state.tempat_tinggal = payload
  },
  updateKota_turki_id(state, payload) {
    state.kota_turki_id = payload
  },
  updateKota_turki_selected(state, payload) {
    state.kota_turki_selected = payload
  },
  updateAlamat_turki(state, payload) {
    state.alamat_turki = payload
  },
  updateWhatsapp(state, payload) {
    state.whatsapp = payload
  },
  updateNo_aktif(state, payload) {
    state.no_aktif = payload
  },
  updateTahun_masuk(state, payload) {
    state.tahun_masuk = payload
  },
  updatePpi_id(state, payload) {
    state.ppi_id = payload
  },
  updatePpi_selected(state, payload) {
    state.ppi_selected = payload
  },
  updateNo_ikamet(state, payload) {
    state.no_ikamet = payload
  },
  updateUniversitas_turki_id(state, payload) {
    state.universitas_turki_id = payload
  },
  updateUniversitas_turki_selected(state, payload) {
    state.universitas_turki_selected = payload
  },
  updateJurusan_id(state, payload) {
    state.jurusan_id = payload
  },
  updateJurusan_selected(state, payload) {
    state.jurusan_selected = payload
  },
  updateJenjang_pendidikan(state, payload) {
    state.jenjang_pendidikan = payload
  },
  updateTahun_ke(state, payload) {
    state.tahun_ke = payload
  },
}
