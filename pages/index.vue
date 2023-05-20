<template>
    <!-- Contents -->
    <b-row class="px-2">

        <!-- Greeting -->
        <b-col cols="12" order="1" md="12" order-md="2" xl="9" order-xl="1" class="mt-4">
            <div class="card-shadow greeting d-flex flex-column align-items-center justify-content-center">
                <p class="fs-1 greeting-text text-center mb-0">Selamat datang {{ this.$auth.user.name }},</p>
                <p class="fs-6 greeting-text-desc">the website developed by @has.bii</p>
            </div>
        </b-col>

        <!-- Widget -->
        <b-col cols="12" order="2" md="12" order-md="1" xl="3" order-xl="2" class="mt-4">
            <b-row class="g-4">

                <!-- Widget 1 -->
                <b-col cols="12" md="6" xl="12">
                    <div class="card-shadow widget widget-ppi d-flex flex-column px-4 py-4">
                        <div class="d-flex flex-row overflow-x-hidden">
                            <p class="fs-5 widget-title">PPI Karabük</p>
                            <a href="#" class="fs-5 widget-more ms-auto">more</a>
                        </div>
                        <div class="d-flex flex-column mt-4">
                            <p class="fs-5 widget-text-body mb-0">orang</p>
                            <b-skeleton height="4rem" width="3rem" v-if="$fetchState.pending"></b-skeleton>
                            <p v-else-if="$fetchState.error" class="widget-text-ppi mb-0">Error</p>
                            <p v-else class="widget-text-ppi mb-0">{{ ppi_count.data.result }}</p>
                        </div>
                    </div>
                </b-col>

                <!-- Widget 2 -->
                <b-col cols="12" md="6" xl="12">
                    <div class="card-shadow widget widget-ppi-turki d-flex flex-column px-4 py-4">
                        <div class="d-flex flex-row">
                            <p class="fs-5 widget-title">PPI Turki</p>
                            <a href="#" class="fs-5 widget-more ms-auto">more</a>
                        </div>
                        <div class="d-flex flex-column mt-4">
                            <p class="fs-5 widget-text-body mb-0">orang</p>
                            <b-skeleton height="4rem" width="3rem" v-if="$fetchState.pending"></b-skeleton>
                            <p v-else-if="$fetchState.error" class="widget-text-ppi mb-0">Error</p>
                            <p v-else class="widget-text-ppi mb-0">{{ ppi_count.data.result }}</p>
                        </div>
                    </div>
                </b-col>
            </b-row>

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
.widget {
    color: #1D1D1D;
}

.widget-title {
    font-weight: 600;
}

.widget-more {
    color: #b98b37;
}

.widget-more:hover {
    color: #1D1D1D !important;
}

.widget-text-body {
    font-weight: 600;
}

.widget-text-ppi {
    font-weight: bolder;
    font-size: 5rem;
    line-height: 5rem;
}
</style>