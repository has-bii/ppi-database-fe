<template>
    <b-row class="px-2 flex-grow-1">

        <!-- Form Data diri -->
        <b-col cols="12" xl="6" class="mt-4">

            <div>
                <b-row style="padding: 0 15px;">

                    <!-- Photo User -->
                    <b-col class="card-shadow card-form p-3 mr-3">
                        <b-skeleton-img v-if="$fetchState.pending" no-aspect class="database-photo"></b-skeleton-img>
                        <img v-else-if="photo_name == null" src="/img/dummy-profile.png" class="database-photo">
                        <img v-else :src="getImageUrl(this.$auth.user.student.photo)" class="database-photo">
                    </b-col>

                    <!-- Requirements -->
                    <b-col cols="12" md="7" class="card-shadow card-form px-4 py-3 mt-4 mt-md-0">
                        <div class="d-flex flex-column">
                            <p class="fs-3 form-title">Requirement</p>
                            <ol class="fs-6 mb-4 pl-3">
                                <li>Dokumen ikamet berformat PDF dan terdiri dari dua halaman, depan dan belakang.</li>
                                <li>Öğrenci belgesi (obel) tidak lebih dari 1 tahun. Karena hanya untuk maksimal 1 tahun.
                                </li>
                            </ol>
                            <div class="d-flex flex-row mt-auto justify-content-center">
                                <b-button variant="light" class="mx-2 px-4" :href="getImageUrl(ikamet)" target="_blank">Buka
                                    ikamet</b-button>
                                <b-button variant="dark" class="mx-2 px-4" :href="getImageUrl(obel)" target="_blank">Buka
                                    Obel</b-button>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <!-- Dokumen -->
            <div class="card-shadow card-form px-5 py-4 mt-4">
                <b-form>

                    <p class="fs-3 form-title">Dokumen</p>

                    <div class="mb-4">
                        <label for="filePhoto" class="form-label">Pas Foto</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <input v-else class="form-control" accept=".jpeg,.jpg,.png,image/jpeg,image/png" type="file"
                            max="1MB" v-on:change="selectPhotoFile" id="filePhoto">
                    </div>

                    <div class="mb-4">
                        <label for="fileIkamet" class="form-label">File ikamet:</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <input v-else class="form-control" type="file" accept=".pdf" id="fileIkamet" max="1MB"
                            v-on:change="selectIkametFile">
                    </div>

                    <div class="mb-4">
                        <label for="fileObel" class="form-label">File öğrenci belgesi</label>
                        <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                        <input v-else class="form-control" type="file" id="fileObel" accept=".pdf" max="1MB"
                            v-on:change="selectObelFile">
                    </div>

                </b-form>
            </div>

        </b-col>

        <!-- Form Kontak Aktif -->
        <b-col cols="12" xl="6" class="mt-4">
            <b-form class="card-shadow card-form px-5 py-4" @submit.prevent="updateRecord">

                <p class="fs-3 form-title">Data pendidikan</p>

                <div class="mb-3">
                    <label for="inputIkamet" class="form-label">No ikamet</label>
                    <b-skeleton v-if="$fetchState.pending" type="input"></b-skeleton>
                    <input v-else type="text" id="inputIkamet" class="form-control" placeholder="Masukan nomor ikamet"
                        v-model="no_ikamet">
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
                <select v-else id="selectJurusan" name="selectJurusan" class="form-select mb-3" @click="fetchJurusans"
                    v-model="jurusan_id">
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

                <!-- Button -->
                <b-row align-h="end">
                    <b-col align-self="end" cols="auto">
                        <b-button variant="outline-dark" class="mt-4" :to="{ name: 'database-insert-2' }">kembali</b-button>
                        <b-button variant="dark" class="mt-4" type="submit">Save</b-button>
                    </b-col>
                </b-row>

            </b-form>
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
            ikamet: '',
            obel: '',
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

        this.ikamet = this.database.data.result.ikamet_file

        this.obel = this.database.data.result.ogrenci_belgesi

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
        getImageUrl(imageFile) {
            // Construct the image URL using the BASE_URL and the relative path to the image file
            return process.env.BASE_URL + imageFile;
        },
        async selectPhotoFile(event) {
            this.file1 = event.target.files[0]

            if (this.file1.size > 1048576) {
                alert('File size exceeds 1MB. Please select a smaller file.');
                // Clear the file input if needed
                event.target.value = '';
                return;
            }

            this.uploadFile(1)

            let fileType = this.file1.type

            event.target.value = '';
            this.file1 = null;

            this.photo_name = 'storage/photos/' + this.$auth.user.id + '_img.' + fileType.split('/').pop();

            await this.$auth.fetchUser()
        },
        selectIkametFile(event) {
            this.file2 = event.target.files[0]

            if (this.file2.size > 1048576) {
                alert('File size exceeds 1MB. Please select a smaller file.');
                // Clear the file input if needed
                event.target.value = '';
                return;
            }

            this.uploadFile(2)

            let fileType = this.file2.type

            event.target.value = '';
            this.file2 = null;

            this.ikamet = 'storage/ikamet/' + this.$auth.user.id + '_ikamet.' + fileType.split('/').pop();
        },
        selectObelFile(event) {
            this.file3 = event.target.files[0]

            if (this.file3.size > 1048576) {
                alert('File size exceeds 1MB. Please select a smaller file.');
                // Clear the file input if needed
                event.target.value = '';
                return;
            }

            this.uploadFile(3)

            let fileType = this.file3.type

            event.target.value = '';
            this.file3 = null;

            this.obel_name = 'storage/obel/' + this.$auth.user.id + '_obel.' + fileType.split('/').pop();
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