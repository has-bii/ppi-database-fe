<template>
    <b-row class="mt-4 pl-3">
        <b-col lg="8" class="card">

            <b-row class="card-body">
                <b-col>

                    <form @submit.prevent="updateRecord">
                        <label for="selectPpi" class="form-label">PPI cabang di Turki</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else id="selectPpi" class="form-select mb-3" v-model="ppi_id" required>
                            <option value="">Pilih PPI wilayah</option>
                            <option v-for="ppi in ppis.data.result.data" :value="ppi.id">{{ ppi.name }}</option>
                        </select>

                        <div class="mb-3">
                            <label for="inputWhatsapp" class="form-label">Nomor Whatsapp</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else type="text" class="form-control" id="inputWhatsapp" v-model="whatsapp"
                                placeholder="Masukkan no whatsapp anda" aria-labelledby="whatsappHelp" required>
                            <div id="whatsappHelp" class="form-text">
                                Dengan awalan kode negara. Contoh +90 / +62.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="inputNoAktif" class="form-label">Nomor Aktif</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else type="text" class="form-control" id="inputNoAktif" v-model="no_aktif"
                                placeholder="Masukkan nomor aktif yang dapat dihubungi" aria-labelledby="noHelp" required>
                            <div id="noHelp" class="form-text">
                                Dengan awalan kode negara. Contoh +90 / +62.
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="inputKedatangan" class="form-label">Tahun kedatangan ke Turki</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else type="text" id="inputDate" class="form-control"
                                placeholder="Masukan tahun kedatangan ke Turki" v-model="tahun_masuk" required>
                        </div>

                        <label for="selectTempatTinggal" class="form-label">Tempat tinggal</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else id="selectGender" class="form-select mb-3" v-model="tempat_tinggal" required>
                            <option selected>Pilih tempat tinggal di Turki</option>
                            <option value="Apartemen">Apartemen</option>
                            <option value="Asrama">Asrama</option>
                        </select>

                        <label for="selectKotaTurki" class="form-label">Kota Turki</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else id="selectKotaTurki" class="form-select mb-3" v-model="kota_turki_id" required>
                            <option value="">Pilih kota tempat tinggal di Turki</option>
                            <option v-for="kotaturki in kota_turkis.data.result.data" :value="kotaturki.id">
                                {{ kotaturki.name }}
                            </option>
                        </select>

                        <div class="mb-3">
                            <label for="inputAlamatTurki" class="form-label">Alamat lengkap Turki</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <textarea v-else class="form-control" id="inputAlamatTurki" rows="3" v-model="alamat_turki"
                                required placeholder="Alamat lengkap di Turki"></textarea>
                        </div>


                        <!-- Button -->
                        <b-row align-h="end">
                            <b-col align-self="end" cols="auto">
                                <b-button variant="outline-dark" class="mt-4"
                                    :to="{ name: 'database-insert' }">kembali</b-button>
                                <b-button variant="dark" class="mt-4" type="submit">Selanjutnya</b-button>
                            </b-col>
                        </b-row>

                    </form>


                </b-col>
            </b-row>

        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'insert-2',
    layout: 'dashboard',
    data() {
        return {
            database: '',
            kota_turkis: '',
            ppis: '',
        }
    },
    async fetch() {

        if (!this.$store.state.database.name) {
            this.$router.push('insert')
        }

        this.database = await this.$axios.get('student')

        this.kota_turkis = await this.$axios.get('kotaturki')

        this.ppis = await this.$axios.get('ppi')

        if (!this.ppi_id) {
            this.$store.commit('database/updatePpi_id', this.database.data.result.ppi_id)
        }

        if (!this.ppi_selected) {
            this.$store.commit('database/updatePpi_selected', this.database.data.result.ppi.name)
        }

        if (!this.whatsapp) {
            this.$store.commit('database/updateWhatsapp', this.database.data.result.whatsapp)
        }

        if (!this.no_aktif) {
            this.$store.commit('database/updateNo_aktif', this.database.data.result.no_aktif)
        }

        if (!this.tahun_masuk) {
            this.$store.commit('database/updateTahun_masuk', this.database.data.result.tahun_masuk)
        }

        if (!this.tempat_tinggal) {
            this.$store.commit('database/updateTempat_tinggal', this.database.data.result.tempat_tinggal)
        }

        if (!this.kota_turki_id) {
            this.$store.commit('database/updateKota_turki_id', this.database.data.result.kota_turki.id)
        }

        if (!this.kota_turki_selected) {
            this.$store.commit('database/updateKota_turki_selected', this.database.data.result.kota_turki.name)
        }

        if (!this.alamat_turki) {
            this.$store.commit('database/updateAlamat_turki', this.database.data.result.alamat_turki)
        }
    },
    computed: {
        ppi_id: {
            get() {
                return this.$store.state.database.ppi_id
            },
            set(value) {
                this.$store.commit('database/updatePpi_id', value)
            }
        },
        ppi_selected: {
            get() {
                return this.$store.state.database.ppi_selected
            },
            set(value) {
                this.$store.commit('database/updatePpi_selected', value)
            }
        },
        whatsapp: {
            get() {
                return this.$store.state.database.whatsapp
            },
            set(value) {
                this.$store.commit('database/updateWhatsapp', value)
            }
        },
        no_aktif: {
            get() {
                return this.$store.state.database.no_aktif
            },
            set(value) {
                this.$store.commit('database/updateNo_aktif', value)
            }
        },
        tahun_masuk: {
            get() {
                return this.$store.state.database.tahun_masuk
            },
            set(value) {
                this.$store.commit('database/updateTahun_masuk', value)
            }
        },
        tempat_tinggal: {
            get() {
                return this.$store.state.database.tempat_tinggal
            },
            set(value) {
                this.$store.commit('database/updateTempat_tinggal', value)
            }
        },
        kota_turki_id: {
            get() {
                return this.$store.state.database.kota_turki_id
            },
            set(value) {
                this.$store.commit('database/updateKota_turki_id', value)
            }
        },
        kota_turki_selected: {
            get() {
                return this.$store.state.database.kota_turki_selected
            },
            set(value) {
                this.$store.commit('database/updateKota_turki_selected', value)
            }
        },
        alamat_turki: {
            get() {
                return this.$store.state.database.alamat_turki
            },
            set(value) {
                this.$store.commit('database/updateAlamat_turki', value)
            }
        },
    },
    methods: {
        updatePpi_id(event) {
            this.$store.commit('database/updatePpi_id', event.target.value)
        },
        updatePpi_selected(event) {
            this.$store.commit('database/updatePpi_selected', event.target.value)
        },
        updateWhatsapp(event) {
            this.$store.commit('database/updateWhatsapp', event.target.value)
        },
        updateNo_aktif(event) {
            this.$store.commit('database/updateNo_aktif', event.target.value)
        },
        updateTahun_masuk(event) {
            this.$store.commit('database/updateTahun_masuk', event.target.value)
        },
        updateTempat_tinggal(event) {
            this.$store.commit('database/updateTempat_tinggal', event.target.value)
        },
        updateKota_turki_id(event) {
            this.$store.commit('database/updateKota_turki_id', event.target.value)
        },
        updateKota_turki_selected(event) {
            this.$store.commit('database/updateKota_turki_selected', event.target.value)
        },
        updateAlamat_turki(event) {
            this.$store.commit('database/updateAlamat_turki', event.target.value)
        },
        async updateRecord() {

            try {
                let response = await this.$axios.post('/student/update', {
                    'tempat_tinggal': this.$store.state.database.tempat_tinggal,
                    'kota_turki_id': this.$store.state.database.kota_turki_id,
                    'alamat_turki': this.$store.state.database.alamat_turki,
                    'whatsapp': this.$store.state.database.whatsapp,
                    'no_aktif': this.$store.state.database.no_aktif,
                    'tahun_masuk': this.$store.state.database.tahun_masuk,
                    'ppi_id': this.$store.state.database.ppi_id,
                })

                // Redirect to home
                this.$router.push({ name: 'database-insert-3' })

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>