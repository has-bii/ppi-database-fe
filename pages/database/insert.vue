<template>
    <!-- Contents -->
    <b-row class="px-2 flex-grow-1">

        <!-- Form Data diri -->
        <b-col cols="12" xl="6" class="mt-4">
            <b-form class="card-shadow card-form px-5 py-4">

                <p class="fs-3 form-title">Data diri</p>

                <div class="mb-3">
                    <label for="inputName" class="form-label">Nama lengkap</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="text" class="form-control" id="inputName" v-model="name"
                        placeholder="Masukan nama lengkap" required>
                </div>

                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Alamat email</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="email" class="form-control" id="inputEmail" required v-model="email"
                        placeholder="Masukan alamat email">
                </div>

                <label for="selectGender" class="form-label">Jenis kelamin</label>
                <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                <select v-else v-model="jenis_kelamin" id="selectGender" required class="form-select mb-3">
                    <option selected>Pilih jenis kelamin anda</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>

                <div class="mb-3">
                    <label for="inputAgama" class="form-label">Agama</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="text" class="form-control" id="inputAgama" required v-model="agama"
                        placeholder="Masukan agama yang dianut">
                </div>

                <div class="mb-3">
                    <label for="inputTempatLahir" class="form-label">Tempat Lahir</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="text" class="form-control" id="inputTempatLahir" required v-model="tempat_lahir"
                        placeholder="Masukan kota tempat anda lahir">
                </div>

                <div class="mb-3">
                    <label for="inputDate" class="form-label">Tanggal Lahir</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="date" id="inputDate" class="form-control" required v-model="tanggal_lahir">
                </div>

            </b-form>
        </b-col>

        <!-- Form Alamat indonesia -->
        <b-col cols="12" xl="6" class="mt-4">
            <b-form class="card-shadow card-form px-5 py-4" @submit.prevent="updateRecord">

                <p class="fs-3 form-title">Alamat Indonesia</p>

                <div class="mb-3">
                    <label for="inputProvinsiIndonesia" class="form-label">Provinsi Indonesia</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="text" class="form-control" id="inputProvinsiIndonesia" required
                        v-model="provinsi_indonesia" placeholder="Masukan provinsi Indonesia anda">
                </div>

                <div class="mb-3">
                    <label for="inputKotaAsal" class="form-label">Asal kota</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="text" class="form-control" id="inputKotaAsal" required v-model="kota_asal_indonesia"
                        placeholder="Masukan asal kota Indonesia anda">
                </div>

                <div>
                    <label for="inputAlamatIndonesia" class="form-label">Alamat lengkap Indonesia</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <textarea v-else class="form-control" id="inputAlamatIndonesia" rows="3" required
                        v-model="alamat_lengkap_indonesia" placeholder="Alamat lengkap di Indonesia"></textarea>
                </div>

                <b-row align-h="end">
                    <b-col align-self="end" cols="auto">
                        <b-button variant="dark" class="mt-4" type="submit">Selanjutnya</b-button>
                    </b-col>
                </b-row>

            </b-form>
        </b-col>

    </b-row>
</template>

<script>
export default {
    name: 'insert',
    layout: 'dashboard',
    data() {
        return {
            database: '',
        }
    },
    async fetch() {
        this.database = await this.$axios.get('student')

        if (!this.name) {
            this.$store.commit('database/updateName', this.database.data.result.name)
        }

        if (!this.email) {
            this.$store.commit('database/updateEmail', this.database.data.result.email)
        }

        if (!this.jenis_kelamin) {
            this.$store.commit('database/updateJenis_kelamin', this.database.data.result.jenis_kelamin)
        }

        if (!this.agama) {
            this.$store.commit('database/updateAgama', this.database.data.result.agama)
        }

        if (!this.tempat_lahir) {
            this.$store.commit('database/updateTempat_lahir', this.database.data.result.tempat_lahir)
        }

        if (!this.tanggal_lahir) {
            this.$store.commit('database/updateTanggal_lahir', this.database.data.result.tanggal_lahir)
        }

        if (!this.provinsi_indonesia) {
            this.$store.commit('database/updateProvinsi_indonesia', this.database.data.result.provinsi_indonesia)
        }

        if (!this.kota_asal_indonesia) {
            this.$store.commit('database/updateKota_asal_indonesia', this.database.data.result.kota_asal_indonesia)
        }

        if (!this.alamat_lengkap_indonesia) {
            this.$store.commit('database/updateAlamat_lengkap_indonesia', this.database.data.result.alamat_lengkap_indonesia)
        }
    },
    computed: {
        name: {
            get() {
                return this.$store.state.database.name
            },
            set(value) {
                this.$store.commit('database/updateName', value)
            }
        },
        email: {
            get() {
                return this.$store.state.database.email
            },
            set(value) {
                this.$store.commit('database/updateEmail', value)
            }
        },
        jenis_kelamin: {
            get() {
                return this.$store.state.database.jenis_kelamin
            },
            set(value) {
                this.$store.commit('database/updateJenis_kelamin', value)
            }
        },
        agama: {
            get() {
                return this.$store.state.database.agama
            },
            set(value) {
                this.$store.commit('database/updateAgama', value)
            }
        },
        tempat_lahir: {
            get() {
                return this.$store.state.database.tempat_lahir
            },
            set(value) {
                this.$store.commit('database/updateTempat_lahir', value)
            }
        },
        tanggal_lahir: {
            get() {
                return this.$store.state.database.tanggal_lahir
            },
            set(value) {
                this.$store.commit('database/updateTanggal_lahir', value)
            }
        },
        provinsi_indonesia: {
            get() {
                return this.$store.state.database.provinsi_indonesia
            },
            set(value) {
                this.$store.commit('database/updateProvinsi_indonesia', value)
            }
        },
        kota_asal_indonesia: {
            get() {
                return this.$store.state.database.kota_asal_indonesia
            },
            set(value) {
                this.$store.commit('database/updateKota_asal_indonesia', value)
            }
        },
        alamat_lengkap_indonesia: {
            get() {
                return this.$store.state.database.alamat_lengkap_indonesia
            },
            set(value) {
                this.$store.commit('database/updateAlamat_lengkap_indonesia', value)
            }
        },
    },
    methods: {
        updateName(event) {
            this.$store.commit('database/updateName', event.target.value)
        },
        updateEmail(event) {
            this.$store.commit('database/setEmail', event.target.value)
        },
        updateJenis_kelamin(event) {
            this.$store.commit('database/setJenis_kelamin', event.target.value)
        },
        updateAgama(event) {
            this.$store.commit('database/setAgama', event.target.value)
        },
        updateTempat_lahir(event) {
            this.$store.commit('database/setTempat_lahir', event.target.value)
        },
        updateTanggal_lahir(event) {
            this.$store.commit('database/setTanggal_lahir', event.target.value)
        },
        updateProvinsi_indonesia(event) {
            this.$store.commit('database/setProvinsi_indonesia', event.target.value)
        },
        updateKota_asal_indonesia(event) {
            this.$store.commit('database/setKota_asal_indonesia', event.target.value)
        },
        updateAlamat_lengkap_indonesia(event) {
            this.$store.commit('database/setAlamat_lengkap_indonesia', event.target.value)
        },
        async updateRecord() {

            try {
                let response = await this.$axios.post('/student/update', {
                    'name': this.$store.state.database.name,
                    'email': this.$store.state.database.email,
                    'jenis_kelamin': this.$store.state.database.jenis_kelamin,
                    'agama': this.$store.state.database.agama,
                    'tempat_lahir': this.$store.state.database.tempat_lahir,
                    'tanggal_lahir': this.$store.state.database.tanggal_lahir,
                    'provinsi_indonesia': this.$store.state.database.provinsi_indonesia,
                    'kota_asal_indonesia': this.$store.state.database.kota_asal_indonesia,
                    'alamat_lengkap_indonesia': this.$store.state.database.alamat_lengkap_indonesia,
                })

                // Redirect to home
                this.$router.push({ name: 'database-insert-2' })

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>