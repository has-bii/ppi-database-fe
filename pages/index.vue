<template>
    <b-row class="mt-4 flex-grow-1" style="background-color: red;">
        <b-col lg="9" style="background-color: blue;">
            <div class="card text-center mb-4">
                <div class="card-body">
                    <h1 style="font-weight: 600;">Selamat datang di PPI Karabük Database</h1>
                </div>
            </div>


            <div v-if="$fetchState.pending" class="card text-center mb-4">
                <div class="card-body">
                    <b-skeleton></b-skeleton>
                </div>
            </div>
            <b-alert v-else-if="this.$auth.user.student.ppi_id" dismissible show variant="success"
                class="align-items-center d-flex">
                Terima kasih telah mengisi database PPI Karabük :)
            </b-alert>
            <b-alert v-else dismissible show variant="warning" class="align-items-center d-flex">
                Anda belum mengisi database. Silahkan&nbsp;<NuxtLink :to="{ name: 'database-insert' }" class="alert-link">
                    klik ini</NuxtLink>&nbsp;untuk mengisi database.
            </b-alert>
        </b-col>

        <!-- Widget -->
        <b-col lg="3">
            <div class="card">
                <div class="card-body">
                    <b-row align-v="center" align-h="center">
                        <b-col class="flex-grow-0">
                            <b-icon-people-fill class="icon-widget"></b-icon-people-fill>
                        </b-col>
                        <b-col class="flex-shrink-1">
                            <h3 style="font-weight: 600;">PPI Karabük</h3>
                            <div v-if="$fetchState.pending"><b-skeleton></b-skeleton></div>
                            <h4 v-else-if="$fetchState.error" style="color: grey;">Error</h4>
                            <h4 v-else style="color: grey;">{{ ppi_count.data.result }}</h4>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>

export default {
    name: 'index',
    layout: 'dashboard',
    data() {
        return {
            ppi_count: '',
        }
    },
    async fetch() {
        this.ppi_count = await this.$axios.get('/student/fetch_count');
    }
}
</script>

<style>
.icon-widget {
    width: 5rem;
    height: 5rem;
}

.card {
    border: 0;
    border-radius: 0;
}
</style>