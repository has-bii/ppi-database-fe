<template>
    <b-row class="mt-4 pl-3">

        <b-modal ref="ikamet-modal" centered scrollable title="File Ikamet" size="xl">
            <div class="d-block text-center">
                <embed :src="getImageUrl(ikamet_name)" type="" width="1000rem" height="700rem">
            </div>
        </b-modal>

        <b-modal ref="obel-modal" centered scrollable title="File Öğrenci Belgesi" size="xl">
            <div class="d-block text-center">
                <embed :src="getImageUrl(ikamet_name)" type="" width="1000rem" height="700rem">
            </div>
        </b-modal>

        <b-col lg="8" class="card">

            <b-row class="card-body">
                <b-col>

                    <form @submit.prevent="updateRecord">
                        <div class="mb-3">
                            <label for="filePhoto" class="form-label">Pas Foto</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else class="form-control" accept=".jpeg,.jpg,.png,image/jpeg,image/png" type="file"
                                max="1MB" v-on:change="selectPhotoFile" id="filePhoto">
                        </div>

                        <div class="mb-3">
                            <label for="inputIkamet" class="form-label">No ikamet</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else type="text" id="inputIkamet" class="form-control"
                                placeholder="Masukan nomor ikamet" v-model="no_ikamet">
                        </div>

                        <div class="mb-3">
                            <label for="fileIkamet" class="form-label">File ikamet: halaman depan & belakang</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else class="form-control" type="file" accept=".pdf" id="fileIkamet" max="1MB"
                                v-on:change="selectIkametFile">
                            <p class="mt-2">File ikamet: <a @click="showModal(1)" href="#">{{ file2 ? file2.name : '' }}</a>
                            </p>
                        </div>

                        <div class="mb-3">
                            <label for="fileObel" class="form-label">File öğrenci belgesi</label>
                            <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                            <input v-else class="form-control" type="file" id="fileObel" accept=".pdf" max="1MB"
                                v-on:change="selectObelFile">
                            <p class="mt-2">File öğrenci belgesi: <a @click="showModal(2)" href="#">{{ file3 ? file3.name :
                                '' }}</a>
                            </p>
                        </div>

                        <label for="selectUniversitas" class="form-label">Universitas</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else id="selectUniversitas" class="form-select mb-3" v-model="universitas_turki_id">
                            <option value="">Pilih Universitas tempat anda kuliah</option>
                            <option v-for="univturki in univturkis.data.result.data" :value="univturki.id">
                                {{ univturki.name }}
                            </option>
                        </select>

                        <label for="selectJurusan" class="form-label">Jurusan</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else id="selectJurusan" name="selectJurusan" class="form-select mb-3"
                            @click="fetchJurusans" v-model="jurusan_id">
                            <option value="">Pilih jurusan</option>
                            <option v-for="jurusan in jurusans" :value="jurusan.id">{{ jurusan.name }}</option>
                        </select>

                        <label for="selectJenjang" class="form-label">Jenjang pendidikan</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else v-model="jenjang_pendidikan" id="selectJenjang" required class="form-select mb-3">
                            <option selected>Pilih jenjang pendidikan yang ditempuh</option>
                            <option value="Lise">Lise</option>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                        </select>

                        <label for="selectTahunKe" class="form-label">Tahun ke</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <select v-else v-model="tahun_ke" id="selectTahunKe" required class="form-select mb-3">
                            <option selected>Pilih tahun ke berapa</option>
                            <option value="TÖMER">TÖMER</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>

                        <b-row align-h="end">
                            <b-col align-self="end" cols="auto">
                                <b-button variant="outline-dark" class="mt-4"
                                    :to="{ name: 'database-insert-2' }">kembali</b-button>
                                <b-button variant="dark" class="mt-4" type="submit">Save</b-button>
                            </b-col>
                        </b-row>

                    </form>


                </b-col>
            </b-row>

        </b-col>

        <b-col cols="auto" class="ml-3">
            <div class="card">
                <div class="card-body" style="height: auto;">
                    <b-skeleton-img v-if="$fetchState.pending" no-aspect width="20rem" height="20rem"></b-skeleton-img>
                    <img v-else-if="photo_name == null" src="/img/dummy-profile.png"
                        style="width: 20rem; height: auto; object-fit: cover;">
                    <img v-else :src="getImageUrl(photo_name)" style="width: 20rem; height: auto; object-fit: cover;">
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'insert-3',
    layout: 'dashboard',
    data() {
        return {
            database: '',
            univturkis: '',
            jurusans: '',
            file1: null,
            file2: null,
            file3: null,
            photo_name: '',
            ikamet_name: '',
            obel_name: '',
        }
    },
    async fetch() {
        if (!this.$store.state.database.name) {
            this.$router.push('insert')
        }
        if (!this.$store.state.database.ppi_id) {
            this.$router.push('insert-2')
        }

        this.database = await this.$axios.get('student')

        this.univturkis = await this.$axios.get('universitasturki')

        this.photo_name = this.database.data.result.photo

        this.ikamet_name = this.database.data.result.ikamet_file

        this.obel_name = this.database.data.result.ogrenci_belgesi

        if (!this.no_ikamet) {
            this.$store.commit('database/updateNo_ikamet', this.database.data.result.no_ikamet)
        }

        if (!this.universitas_turki_id) {
            this.$store.commit('database/updateUniversitas_turki_id', this.database.data.result.universitas_turki_id)
            this.fetchJurusans()
        }

        if (!this.universitas_turki_selected) {
            this.$store.commit('database/updateUniversitas_turki_selected', this.database.data.result.universitas_turki.name)
        }

        if (!this.jurusan_id) {
            this.$store.commit('database/updateJurusan_id', this.database.data.result.jurusan_id)
        }

        if (!this.jurusan_selected) {
            this.$store.commit('database/updateJurusan_selected', this.database.data.result.jurusan.name)
        }

        if (!this.jenjang_pendidikan) {
            this.$store.commit('database/updateJenjang_pendidikan', this.database.data.result.jenjang_pendidikan)
        }

        if (!this.tahun_ke) {
            this.$store.commit('database/updateTahun_ke', this.database.data.result.tahun_ke)
        }
    },
    computed: {
        no_ikamet: {
            get() {
                return this.$store.state.database.no_ikamet
            },
            set(value) {
                this.$store.commit('database/updateNo_ikamet', value)
            }
        },
        universitas_turki_id: {
            get() {
                return this.$store.state.database.universitas_turki_id
            },
            set(value) {
                this.$store.commit('database/updateUniversitas_turki_id', value)
                this.fetchJurusans()
            }
        },
        universitas_turki_selected: {
            get() {
                return this.$store.state.database.universitas_turki_selected
            },
            set(value) {
                this.$store.commit('database/updateUniversitas_turki_selected', value)
            }
        },
        jurusan_id: {
            get() {
                return this.$store.state.database.jurusan_id
            },
            set(value) {
                this.$store.commit('database/updateJurusan_id', value)
            }
        },
        jurusan_selected: {
            get() {
                return this.$store.state.database.jurusan_selected
            },
            set(value) {
                this.$store.commit('database/updateJurusan_selected', value)
            }
        },
        jenjang_pendidikan: {
            get() {
                return this.$store.state.database.jenjang_pendidikan
            },
            set(value) {
                this.$store.commit('database/updateJenjang_pendidikan', value)
            }
        },
        tahun_ke: {
            get() {
                return this.$store.state.database.tahun_ke
            },
            set(value) {
                this.$store.commit('database/updateTahun_ke', value)
            }
        },
    },
    methods: {
        showModal(index) {

            index == 1 ?
                this.$refs['ikamet-modal'].show() :
                this.$refs['obel-modal'].show()

        },
        getImageUrl(imageFile) {
            // Construct the image URL using the BASE_URL and the relative path to the image file
            return process.env.BASE_URL + imageFile;
        },
        async selectPhotoFile(event) {
            this.file1 = event.target.files[0]

            this.uploadFile(1)

            this.photo_name = 'storage/photos/' + this.file1.name

            await this.$auth.fetchUser()
        },
        selectIkametFile(event) {
            this.file2 = event.target.files[0]

            this.uploadFile(2)

            this.ikamet_name = 'storage/ikamet/' + this.file2.name
        },
        selectObelFile(event) {
            this.file3 = event.target.files[0]

            this.uploadFile(3)

            this.obel_name = 'storage/obel/' + this.file3.name
        },
        async uploadFile(index) {
            const formData = new FormData();

            index == 1 ?
                formData.append('photo', this.file1) :
                index == 2 ?
                    formData.append('ikamet_file', this.file2) :
                    formData.append('ogrenci_belgesi', this.file3)

            await this.$axios.post('/student/update', formData)
                .then(response => {
                    // Handle the response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        },
        async updateRecord() {

            try {
                let response = await this.$axios.post('/student/update', {
                    'no_ikamet': this.$store.state.database.no_ikamet,
                    'universitas_turki_id': this.$store.state.database.universitas_turki_id,
                    'jurusan_id': this.$store.state.database.jurusan_id,
                    'jenjang_pendidikan': this.$store.state.database.jenjang_pendidikan,
                    'tahun_ke': this.$store.state.database.tahun_ke,
                })

                // Clear Vuex
                this.$store.commit('database/updateName', '')
                this.$store.commit('database/updateEmail', '')
                this.$store.commit('database/updateJenis_kelamin', '')
                this.$store.commit('database/updateAgama', '')
                this.$store.commit('database/updateTempat_lahir', '')
                this.$store.commit('database/updateTanggal_lahir', '')
                this.$store.commit('database/updateProvinsi_indonesia', '')
                this.$store.commit('database/updateKota_asal_indonesia', '')
                this.$store.commit('database/updateAlamat_lengkap_indonesia', '')
                this.$store.commit('database/updateTempat_tinggal', '')
                this.$store.commit('database/updateKota_turki_id', '')
                this.$store.commit('database/updateKota_turki_selected', '')
                this.$store.commit('database/updateAlamat_turki', '')
                this.$store.commit('database/updateWhatsapp', '')
                this.$store.commit('database/updateNo_aktif', '')
                this.$store.commit('database/updateTahun_masuk', '')
                this.$store.commit('database/updatePpi_id', '')
                this.$store.commit('database/updatePpi_selected', '')
                this.$store.commit('database/updateNo_ikamet', '')
                this.$store.commit('database/updateUniversitas_turki_id', '')
                this.$store.commit('database/updateUniversitas_turki_selected', '')
                this.$store.commit('database/updateJurusan_id', '')
                this.$store.commit('database/updateJurusan_selected', '')
                this.$store.commit('database/updateJenjang_pendidikan', '')
                this.$store.commit('database/updateTahun_ke', '')

                // Redirect to home
                this.$router.push({ name: 'index' })

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        updateNo_ikamet(event) {
            this.$store.commit('database/updateNo_ikamet', event.target.value)
        },
        updateUniversitas_turki_id(event) {
            this.$store.commit('database/updateUniversitas_turki_id', event.target.value)
        },
        updateUniversitas_turki_selected(event) {
            this.$store.commit('database/updateUniversitas_turki_selected', event.target.value)
        },
        updateJurusan_id(event) {
            this.$store.commit('database/updateJurusan_id', event.target.value)
        },
        updateJurusan_selected(event) {
            this.$store.commit('database/updateJurusan_selected', event.target.value)
        },
        updateJenjang_pendidikan(event) {
            this.$store.commit('database/updateJenjang_pendidikan', event.target.value)
        },
        updateTahun_ke(event) {
            this.$store.commit('database/updateTahun_ke', event.target.value)
        },
        async fetchJurusans() {
            let jurusans = await this.$axios.get('/jurusan', {
                params: {
                    universitas_turki_id: this.$store.state.database.universitas_turki_id,
                    limit: 200,
                },
            })

            this.jurusans = jurusans.data.result.data
        }
    }
}
</script>