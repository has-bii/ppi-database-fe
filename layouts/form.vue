<template>
    <b-container fluid>
        <b-row class="vh-100">
            <b-col class="p-4 h-100 d-flex flex-column">

                <b-row class="justify-content-lg-start">
                    <b-col cols="auto">
                        <b-img src="/logo/Logo.svg"></b-img>
                    </b-col>
                </b-row>

                <b-row align-v="center" align-h="center" class="flex-grow-1">
                    <Nuxt />
                </b-row>

            </b-col>

            <b-col xl="8" lg="7" align-self="center" class="pr-4 pl-0 d-none d-lg-block">
                <b-img fluid-grow src=" /img/login_img.jpg"
                    style="border-radius: 1rem; object-fit: cover; height: 95vh;"></b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<style>
body {
    background: white;
}
</style>

                <Nuxt />