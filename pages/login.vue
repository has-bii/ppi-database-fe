<template>
    <b-row align-v="center" align-h="center">
        <transition name="page" mode="out-in">
            <b-col align-self="center" cols="auto">
                <h1 class="text-center">Selamat datang!</h1>
                <p class="text-center" style="color: #8f8f8f;">Masukan email dan password anda.</p>

                <b-form class="mt-4" @submit.prevent="userLogin">

                    <!-- Email -->
                    <b-form-group id="email" label="Email" label-for="input-email">
                        <b-form-input id="email" type="email" placeholder="Masukan email" required
                            v-model="login.email"></b-form-input>
                    </b-form-group>
                    <!-- Password -->
                    <b-form-group id="password" label="Password" label-for="input-password">
                        <b-form-input id="password" type="password" placeholder="Masukan password" required
                            v-model="login.password"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" block variant="dark" class="mt-4">Masuk</b-button>
                    <p class="mt-3 text-center" style="color: #8f8f8f;">Baru di PPI Database? <NuxtLink
                            :to="{ name: 'register' }">Daftar</NuxtLink>
                    </p>
                </b-form>
            </b-col>
        </transition>
    </b-row>
</template>

<script>
export default {
    name: 'login',
    auth: 'guest',
    layout: 'form',
    transition: {
        name: 'page',
        mode: 'out-in'
    },
    data() {
        return {
            login: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async userLogin() {
            try {
                let response = await this.$auth.loginWith('local', { data: this.login })
                    .then(() => this.$bvToast.toast('Logged In!', {
                        title: 'Authentication',
                        autoHideDelay: 5000,
                        appendToast: append
                    }))
                console.log(response)

            } catch (err) {
                await this.$bvToast.toast('Invalid email/password', {
                    title: 'Authentication Failed',
                    variant: 'danger',
                })
                // this.$store.commit('login/setMessage',)
                // this.$data.showDismissibleAlert = true
            }
        },
    }

}
</script>