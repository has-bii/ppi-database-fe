<template>
    <b-container fluid>

        <b-row class="vh-100">

            <!-- Sidebar -->
            <b-col class="px-0 py-4 sidenav d-none d-lg-block">
                <div class="h-100 d-flex flex-column">

                    <!-- Logo -->
                    <b-row align-h="center">
                        <b-col cols="auto" class="px-0">
                            <b-img src="/logo/Logo_white.svg"></b-img>
                        </b-col>
                    </b-row>

                    <!-- Nav list -->
                    <b-row align-h="center" class="flex-grow-1">
                        <b-col cols="auto" style="margin-top: 4rem;">
                            <div class="d-flex flex-column mb-5">
                                <!-- Dashboard -->
                                <b-link v-if="this.$route.name == 'index'" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="house-fill" class="mr-3 icon-nav"></b-icon>Dashboard
                                </b-link>
                                <b-link v-else :to="{ name: 'index' }" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="house" class="mr-3 icon-nav"></b-icon>Dashboard
                                </b-link>

                                <!-- Database -->
                                <b-link
                                    v-if="this.$route.name == 'database-insert' || this.$route.name == 'database-insert-2' || this.$route.name == 'database-insert-3'"
                                    class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="file-earmark-plus-fill" class="mr-3 icon-nav"></b-icon>Database
                                </b-link>
                                <b-link v-else :to="{ name: 'database-insert' }" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="file-earmark-plus" class="mr-3 icon-nav"></b-icon>Database
                                </b-link>
                            </div>
                        </b-col>
                    </b-row>

                    <!-- User -->
                    <b-row align-h="center">
                        <b-col align-self="center" cols="auto" class="p-4 px-5 user-box">
                            <b-skeleton-img v-if="$fetchState.pending" rounded="circle"
                                class="profile-img"></b-skeleton-img>
                            <b-img v-else-if="user.data.result.student.photo == null" center src="/img/dummy-profile.png"
                                rounded="circle" class="profile-img" style="object-fit: cover;"></b-img>
                            <b-img v-else center :src="getUrl(user.data.result.student.photo)" rounded="circle"
                                class="profile-img" style="object-fit: cover;"></b-img>
                            <b-skeleton v-if="$fetchState.pending"></b-skeleton>
                            <p v-else-if="$fetchState.error" class="fs-5 text-center user-text mb-0 mt-2">Error</p>
                            <p v-else class="fs-5 text-center user-text mb-0 mt-2">{{ user.data.result.student.short_name }}
                            </p>
                            <b-skeleton v-if="$fetchState.pending"></b-skeleton>
                            <p v-else-if="$fetchState.error" class="fs-6 text-center user-text-role mb-0">Error</p>
                            <p v-else class="fs-6 text-center user-text-role mb-0">{{ user.data.result.role.name }}</p>
                        </b-col>
                    </b-row>

                    <!-- Logout -->
                    <b-row align-h="center" class="mt-5">
                        <b-col cols="auto">
                            <div class="d-flex flex-column justify-content-center mb-3">
                                <b-link class="p-2 nav-side-link fs-4" @click="logout">
                                    <b-icon icon="box-arrow-right" class="mr-3 icon-nav-border"></b-icon>Log out</b-link>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-col>

            <b-col xl="10" lg="9" class="h-100 d-flex flex-column" style="background-color: #1D1D1D;">
                <div class="flex-grow-1 px-2 py-4 p-sm-5 overflow-auto hidden-scroll"
                    style="background-color: #F5F5F5; border-radius: 2rem; margin: 1.5em 0;">

                    <!-- Navbar -->
                    <b-row class="px-2">
                        <b-col cols="12">

                            <div class="my-navbar card-shadow d-flex flex-row align-items-center p-4">
                                <div class="fs-4 nav-title me-auto">{{ this.$route.name == `index` ? `Dashboard` :
                                    `Database` }}
                                </div>
                                <div>
                                    <b-icon icon="chat-dots-fill" class="icon-navbar"></b-icon>
                                </div>
                                <div>
                                    <b-icon icon="bell-fill" class="icon-navbar ml-2"></b-icon>
                                </div>
                                <div class="d-block d-lg-none">
                                    <b-icon v-b-toggle.sidebar-right icon="grid-fill" class="icon-navbar ml-2"></b-icon>
                                </div>
                            </div>

                        </b-col>
                    </b-row>

                    <!-- Contents -->
                    <Nuxt />

                </div>
            </b-col>

        </b-row>

        <b-sidebar id="sidebar-right" title="Side Nav" left shadow bg-variant="dark">
            <b-col class="px-0 py-4 sidenav">
                <div class="h-100 d-flex flex-column">

                    <!-- Logo -->
                    <b-row align-h="center">
                        <b-col cols="auto" class="px-0">
                            <b-img src="/logo/Logo_white.svg"></b-img>
                        </b-col>
                    </b-row>

                    <!-- Nav list -->
                    <b-row align-h="center" class="flex-grow-1">
                        <b-col cols="auto" style="margin-top: 4rem;">
                            <div class="d-flex flex-column mb-5">
                                <!-- Dashboard -->
                                <b-link v-if="this.$route.name == 'index'" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="house-fill" class="mr-3 icon-nav"></b-icon>Dashboard
                                </b-link>
                                <b-link v-else :to="{ name: 'index' }" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="house" class="mr-3 icon-nav"></b-icon>Dashboard
                                </b-link>

                                <!-- Database -->
                                <b-link
                                    v-if="this.$route.name == 'database-insert' || this.$route.name == 'database-insert-2' || this.$route.name == 'database-insert-3'"
                                    class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="file-earmark-plus-fill" class="mr-3 icon-nav"></b-icon>Database
                                </b-link>
                                <b-link v-else :to="{ name: 'database-insert' }" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="file-earmark-plus" class="mr-3 icon-nav"></b-icon>Database
                                </b-link>
                            </div>
                        </b-col>
                    </b-row>

                    <!-- User -->
                    <b-row align-h="center">
                        <b-col align-self="center" cols="auto" class="p-4 px-5 user-box">
                            <b-skeleton-img v-if="$fetchState.pending" rounded="circle"
                                class="profile-img"></b-skeleton-img>
                            <b-img v-else-if="user.data.result.student.photo == null" center src="/img/dummy-profile.png"
                                rounded="circle" class="profile-img" style="object-fit: cover;"></b-img>
                            <b-img v-else center :src="getUrl(user.data.result.student.photo)" rounded="circle"
                                class="profile-img" style="object-fit: cover;"></b-img>
                            <b-skeleton v-if="$fetchState.pending"></b-skeleton>
                            <p v-else-if="$fetchState.error" class="fs-5 text-center user-text mb-0 mt-2">Error</p>
                            <p v-else class="fs-5 text-center user-text mb-0 mt-2">{{ user.data.result.student.short_name }}
                            </p>
                            <b-skeleton v-if="$fetchState.pending"></b-skeleton>
                            <p v-else-if="$fetchState.error" class="fs-6 text-center user-text-role mb-0">Error</p>
                            <p v-else class="fs-6 text-center user-text-role mb-0">{{ user.data.result.role.name }}</p>
                        </b-col>
                    </b-row>

                    <!-- Logout -->
                    <b-row align-h="center" class="mt-5">
                        <b-col cols="auto">
                            <div class="d-flex flex-column justify-content-center mb-3">
                                <b-link class="p-2 nav-side-link fs-4" @click="logout">
                                    <b-icon icon="box-arrow-right" class="mr-3 icon-nav-border"></b-icon>Log out</b-link>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-sidebar>
    </b-container>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {
            url: process.env.BASE_URL,
            user: ''
        }
    },
    async fetch() {

        try {
            this.user = await this.$axios.get('user')

            console.log(user)
        } catch (error) {
            console.log(error)
        }

    },
    methods: {
        async logout() {
            await this.$auth.logout()

            if (!this.$auth.loggedIn) {
                this.$router.push('/login')
            }

            return
        },
        getUrl(file) {
            return process.env.BASE_URL + file
        }
    }
}
</script>

<style>
body {
    font-family: 'Poppins';
}

.nav-title {
    font-weight: 600;
}

.my-navbar {
    background-color: #95CFD9;
}

.card-shadow {
    border-radius: 2rem;
    box-shadow: 20px 20px 40px -15px rgb(0 0 0 / 15%);
    position: relative;
    z-index: 1;
}

.greeting {
    background: #fff url(/img/greeting.jpg) center center/cover no-repeat;
    height: 30rem;
    color: white;
}

.greeting-text {
    font-weight: 600;
}

.greeting-text-desc {
    font-weight: 400;
}

.widget-ppi {
    background: #FEBF4C;
}

.widget-ppi-turki {
    background: #e13f3f;
}

.widget-ppi-turki div .widget-more {
    color: #f3acac;
}

.sidenav {
    background-color: #1D1D1D;
    margin-right: -15px;
}

.nav-side-link {
    color: white;
    font-weight: 400;
}

a:hover {
    color: white !important;
    text-decoration: none;
}

.nav-side-link:hover {
    font-weight: 600;
}

.sidebar-divider {
    border-top: 1px solid #ffffff;
    margin: 2rem 1.4rem;
}

.icon-nav,
.icon-navbar {
    width: 1.5rem;
    height: 1.5rem;
}

.icon-nav-border {
    vertical-align: middle !important;
    border-radius: 2rem;
    padding: 0 8px 0px 12px;
    color: #1D1D1D;
    background-color: white;
    width: 2.8rem;
    height: 2.8rem;
}

.profile-img {
    width: 8rem;
    height: 8rem;
}

.user-text {
    color: white;
}

.user-text-role {
    color: aliceblue;
}

.user-box {
    background: linear-gradient(180deg, #363636 0%, #161616 100%);
    border-radius: 2rem;
}

.card-form {
    background-color: #ffffff;
}

.form-control {
    border-radius: 1rem;
}

.form-select {
    border-radius: 1rem;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hidden-scroll::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hidden-scroll {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.form-title {
    font-weight: 600;
}

.btn {
    border-radius: 1rem;
}

.database-photo {
    width: 100%;
    max-height: 15rem;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
}

.warning-input {
    color: red;
}

.bg-dark {
    background-color: #1D1D1D !important;
}

.text-dark {
    color: #fff !important;
}
</style>