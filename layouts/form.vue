<template>
    <b-container fluid>
        <b-row align-v="center" align-h="center" class="vh-100">
            <b-col cols="auto" xl="3" lg="4" md="auto" class="m-5">
                <!-- <b-row>
                    <b-col>
                        <b-img src="/logo/Logo.svg"></b-img>
                    </b-col>
                </b-row> -->

                <Nuxt />

            </b-col>
            <b-col class="m-2 d-none d-md-flex">
                <b-img fluid-grow src="/img/login_img.jpg" style="
                        height: 63rem; 
                        width: 84rem; 
                        object-fit: cover;
                        border-radius: 1rem;"></b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<style>
body {
    background: white;
}
</style>