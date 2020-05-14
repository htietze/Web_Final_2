<template>
    <div class="footer">

        <div class="m-2">
            <span class="p-3">
                <!-- Footer contains 3 links, routing to the full map, the home page, and the about page
                These routes are set in the /router/index.js file, naming the components to display -->
                <router-link to="/fullmap">Full Map</router-link>
            </span>
            <span class="p-3">
                <router-link to="/">Home</router-link>
            </span>

            <span class="p-3">
                <router-link to="/about">About this site</router-link>
            </span>
        </div>

        <p class="text-right p-2">Header image by
            <a href="https://unsplash.com/photos/KpBXAOs80YI">@chrislawton via Unsplash.</a>
            <br>
            <a href="https://icons8.com/icon/43632/map">Map icon by Icons8</a>
            <br>
            <a href="https://icons8.com/icon/97370/push-pin">Push Pin icon by Icons8</a>
        </p>

    </div>

</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
</style>