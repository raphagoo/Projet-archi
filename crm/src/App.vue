<template>
    <v-app>
        <v-app-bar>
            <router-link to="/">
                <v-btn icon>
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>

            <v-toolbar-title>CRM archi</v-toolbar-title>

            <v-spacer></v-spacer>


            <router-link to="/basket">
                <v-btn icon>
                    <v-icon>shopping_cart</v-icon>
                </v-btn>
            </router-link>
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
