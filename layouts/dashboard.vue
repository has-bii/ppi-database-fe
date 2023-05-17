<template>
    <b-container fluid>
        <b-row class="vh-100">

            <b-col xl="2" style="background: #1D1D1D; color: white;">

                <!-- Sidebar -->
                <div class="brand my-3 px-3 d-flex align-items-center justify-content-center">
                    <b-img src="/logo/Logo_white.svg"></b-img>
                    <div class="brand-text mx-3">PPI Karabük</div>
                </div>

                <b-list-group class="my-5">
                    <b-list-group-item v-if="this.$route.name == 'index'" active :to="{ name: 'index' }"
                        class="d-flex align-items-center">
                        <b-icon icon="house-fill" class="mr-3 icon-nav">
                        </b-icon>
                        <span>
                            Dashboard
                        </span>
                    </b-list-group-item>
                    <b-list-group-item v-else :to="{ name: 'index' }" class="d-flex align-items-center">
                        <b-icon icon="house" class="mr-3 icon-nav">
                        </b-icon>
                        <span>
                            Dashboard
                        </span>
                    </b-list-group-item>
                    <b-list-group-item
                        v-if="this.$route.name == 'database-insert' || this.$route.name == 'database-insert-2' || this.$route.name == 'database-insert-3'"
                        :to="{ name: 'database-insert' }" active class="d-flex align-items-center">
                        <b-icon icon="pencil-fill" class="mr-3 icon-nav">
                        </b-icon>
                        <span>
                            Isi database
                        </span>
                    </b-list-group-item>
                    <b-list-group-item v-else :to="{ name: 'database-insert' }" class="d-flex align-items-center">
                        <b-icon icon="pencil" class="mr-3 icon-nav">
                        </b-icon>
                        <span>
                            Isi database
                        </span>
                    </b-list-group-item>
                </b-list-group>

                <hr class="sidebar-divider">

                <b-list-group class="my-5">
                    <b-list-group-item class="d-flex align-items-center">
                        <b-icon icon="gear" class="mr-3 icon-nav">
                        </b-icon>
                        <span>
                            Settings
                        </span>
                    </b-list-group-item>
                    <b-list-group-item @click="logout" href="#" class="d-flex align-items-center">
                        <b-icon icon="box-arrow-right" class="mr-3 icon-nav">
                        </b-icon>
                        <span>
                            Logout
                        </span>
                    </b-list-group-item>
                </b-list-group>
            </b-col>

            <b-col xl="10" style="background: #F5F5F5;">

                <!-- Navbar -->
                <b-navbar sticky class="navbar-border">
                    <b-navbar-nav>
                        <h1 style="font-weight: 700;">{{ this.$route.name == `index` ? `Dashboard` : `Isi Database` }}</h1>
                    </b-navbar-nav>

                    <b-navbar-nav class="ml-auto">
                        <b-img v-if="this.$auth.user.student.photo == null" src="/img/dummy-profile-pic.png"
                            rounded="circle" style="width: 3.4rem; height: 3.4rem; object-fit: cover;">
                        </b-img>
                        <b-img v-else :src="url + this.$auth.user.student.photo" rounded="circle"
                            style="width: 3.4rem; height: 3.4rem; object-fit: cover;">
                        </b-img>
                        <b-row class="pl-3">
                            <b-col>
                                <b-nav-item-dropdown right>
                                    <!-- Using 'button-content' slot -->
                                    <template #button-content>
                                        <a style="font-weight: 600; color: #1D1D1D; font-size: 1.4rem; padding: 0;">Hasbiy
                                            R</a>
                                    </template>
                                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                                    <b-dropdown-item @click="logout">Sign
                                        Out</b-dropdown-item>
                                </b-nav-item-dropdown>
                                <b-nav-text class="py-0" style="font-weight: 500; color: #9E9E9E;">Admin</b-nav-text>
                            </b-col>
                        </b-row>
                    </b-navbar-nav>
                </b-navbar>

                <!-- Widgets -->
                <!-- <b-row class="mt-4">
                    <b-col lg="3">
                        <div class="py-3 px-4 card text-center" style="border: 0; border-radius: 0; min-height: 20rem;">
                            <h1>Widget 1</h1>
                        </div>
                    </b-col>
                    <b-col lg="3">
                        <div class="py-3 px-4 card text-center" style="border: 0; border-radius: 0;">
                            <h1>Widget 2</h1>
                        </div>
                    </b-col>
                    <b-col lg="3">
                        <div class="py-3 px-4 card text-center" style="border: 0; border-radius: 0;">
                            <h1>Widget 3</h1>
                        </div>
                    </b-col>
                    <b-col lg="3">
                        <div class="py-3 px-4 card text-center" style="border: 0; border-radius: 0;">
                            <h1>Widget 4</h1>
                        </div>
                    </b-col>
                </b-row> -->

                <!-- Contents -->
                <Nuxt />

            </b-col>

        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {
            url: process.env.BASE_URL
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout()

            if (!this.$auth.loggedIn) {
                this.$router.push('/login')
            }

            return
        }
    }
}
</script>

<style>
body {
    font-family: 'Poppins';
}

.brand-text {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 2rem;
}

.list-group-item {
    background-color: transparent !important;
    border: none;
    color: white;
    font-size: 1.3rem;
    font-weight: 300;
}

.icon-nav {
    width: 1.5rem;
    height: 1.5rem;
}

.sidebar-divider {
    border-top: 1px solid #ffffff;
    margin: 0 1.2rem;
}

.list-group-item.active {
    font-weight: 600;
}

.navbar-border {
    border-bottom: 1px solid #B4B4B4;
    background: #F5F5F5;
}

a.dropdown-toggle {
    padding: 0 !important;
}
</style>