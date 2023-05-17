<template>
    <b-row align-v="center" align-h="center">
        <transition name="page" mode="out-in">
            <b-col align-self="center" cols="auto">
                <h1 class="text-center">Daftar akun baru</h1>
                <p class="text-center" style="color: #8f8f8f;">Gunakan email dan password yang mudah diingat.</p>

                <b-form class="mt-4" @submit.prevent="userRegister">
                    <b-alert v-model="showDismissibleAlert" variant="danger" fade dismissible>
                        {{ $store.state.message.message }}
                    </b-alert>

                    <!-- Nama -->
                    <b-form-group id="name" label="Nama" label-for="input-name">
                        <b-form-input id="name" type="text" placeholder="Masukan name lengkap" required
                            v-model="register.name"></b-form-input>
                    </b-form-group>
                    <!-- Email -->
                    <b-form-group id="email" label="Email" label-for="input-email">
                        <b-form-input id="email" type="email" placeholder="Masukan email" required
                            v-model="register.email"></b-form-input>
                    </b-form-group>
                    <!-- Password -->
                    <b-form-group id="password" label="Password" label-for="input-password">
                        <b-form-input id="password" type="password" placeholder="Masukan password" required
                            v-model="register.password"></b-form-input>
                    </b-form-group>
                    <!-- Password -->
                    <b-form-group id="password2" label="Verifikasi Password" label-for="input-password2">
                        <b-form-input id="password2" type="password" placeholder="Masukan ulang password"
                            v-model="register.password2" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" block variant="dark" class="mt-4">Daftar</b-button>
                    <p class="mt-3 text-center" style="color: #8f8f8f;">Sudah punya akun? <NuxtLink :to="{ name: 'login' }">
                            Masuk</NuxtLink>
                    </p>
                </b-form>
            </b-col>
        </transition>
    </b-row>
</template>

<script>
import { BIconChevronDoubleLeft } from 'bootstrap-vue'

export default {
    name: 'register',
    auth: 'guest',
    layout: 'form',
    transition: {
        name: 'page',
        mode: 'out-in'
    },
    data() {
        return {
            register: {
                name: '',
                email: '',
                password: '',
                password2: '',
            },
            showDismissibleAlert: false,
        }
    },
    computed: {
        message() {
            return this.$store.state.message.message
        },
        error() {
            return this.$store.state.message.error
        },
    },
    methods: {
        async userRegister() {
            try {
                if (this.$data.register.password != this.$data.register.password2) {

                    this.$store.commit('message/setMessage', 'Password harus sama!')

                    this.$data.showDismissibleAlert = true

                    return
                }


                // Send Registration Data to Server
                let response = await this.$axios.post('/register', this.register)

                this.$store.commit('message/setError', response)

                // If Successful, Login User
                try {
                    let login = await this.$auth.loginWith('local', {
                        data: {
                            email: this.register.email,
                            password: this.register.password,
                        },
                    })
                    console.log(login)
                } catch (err) {
                    console.log(err)
                }

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
    },

}
</script>