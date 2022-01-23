<template>
    <v-app>
        <v-app-bar>
            <router-link to="/">
                <v-btn icon>
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>

            <v-toolbar-title>Back archi</v-toolbar-title>

        </v-app-bar>
        <router-view/>
    </v-app>
</template>

<style lang="scss">
// @import '~normalize.css';
// @import '~reset-css/_reset.scss';
* {
    box-sizing: border-box;
}
header{
    flex: none !important;
}
a{
    text-decoration: none;
}
</style>
