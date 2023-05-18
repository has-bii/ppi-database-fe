<template>
    <b-container fluid>

        <b-row class="vh-100">

            <!-- Sidebar -->
            <b-col class="px-0 py-4 sidenav d-none d-lg-block">
                <div class="h-100 d-flex flex-column">
                    <b-row align-h="center">
                        <b-col cols="10" class="px-0">
                            <div class="d-flex flex-row">
                                <b-img src="/logo/Logo_white.svg"></b-img>
                                <div class="brand-text ml-3 d-flex align-items-center fs-3">PPI Karabük</div>
                                <!-- <b-icon icon="list" class="ml-auto" style="color: white;"></b-icon> -->
                            </div>
                        </b-col>
                    </b-row>
                    <b-row align-h="center" class="flex-grow-1">
                        <b-col style="margin-top: 4rem;">
                            <div class="d-flex flex-column mb-5 pl-3">
                                <b-link v-if="this.$route.name == 'index'" class="p-1 my-2 nav-side-link fs-4"
                                    style="border-right: 4px solid #FFFF; font-weight: 600;">
                                    <b-icon icon="house-fill" class="mr-3 icon-nav"></b-icon>Dashboard
                                </b-link>
                                <b-link v-else :to="{ name: 'index' }" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="house" class="mr-3 icon-nav"></b-icon>Dashboard
                                </b-link>
                                <b-link
                                    v-if="this.$route.name == 'database-insert' || this.$route.name == 'database-insert-2' || this.$route.name == 'database-insert-3'"
                                    class="p-1 my-2 nav-side-link fs-4"
                                    style="border-right: 4px solid #FFFF; font-weight: 600;">
                                    <b-icon icon="file-earmark-plus-fill" class="mr-3 icon-nav"></b-icon>Database
                                </b-link>
                                <b-link v-else :to="{ name: 'database-insert' }" class="p-1 my-2 nav-side-link fs-4">
                                    <b-icon icon="file-earmark-plus" class="mr-3 icon-nav"></b-icon>Database
                                </b-link>
                            </div>
                        </b-col>
                    </b-row>

                    <hr class="sidebar-divider">

                    <b-row>
                        <b-col>
                            <div class="d-flex flex-column mb-3 pl-3">
                                <b-link class="p-2 nav-side-link fs-4"><b-icon icon="gear"
                                        class="mr-3 icon-nav"></b-icon>Settings</b-link>
                                <b-link class="p-2 nav-side-link fs-4" @click="logout">
                                    <b-icon icon="box-arrow-right" class="mr-3 icon-nav"></b-icon>Logout</b-link>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-col>

            <b-col xl="10" lg="9" class="h-100 d-flex flex-column" style="background-color: #1D1D1D;">

                <b-row class="flex-grow-1" style="background-color: #F5F5F5; border-radius: 2rem; margin: 1.5em 0;">

                    <b-col cols="auto" class="px-0">

                        <div class="card-shadow p-5 text-center mt-4 ml-4"
                            style="background-color: #ffffff; border-radius: 2rem;">
                            <h4>Test</h4>
                        </div>

                    </b-col>

                </b-row>

            </b-col>

            <!-- Sidebar -->
            <!-- <b-col xl="2" style="background: #1D1D1D; color: white;">

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
            </b-col> -->

        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {
            url: process.env.BASE_URL,
            name: this.$auth.user.name,
            role: this.$auth.user.role.name,
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

.card-shadow {
    box-shadow: 20px 20px 40px -15px rgb(0 0 0 / 15%);
}

.brand-text {
    color: white;
    font-style: normal;
    font-weight: 600;
    line-height: 1em;
}

.sidenav {
    background-color: #1D1D1D;
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
    border-right: 4px solid #FFFF;
    font-weight: 600;
}

.sidebar-divider {
    border-top: 1px solid #ffffff;
    margin: 2rem 1.4rem;
}

.icon-nav {
    width: 1.5rem;
    height: 1.5rem;
}

.list-group-item.active {
    font-weight: 600;
}

.navbar-border {
    background: #ffffff;
}

a.dropdown-toggle {
    padding: 0 !important;
}
</style>