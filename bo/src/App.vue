<template>
    <v-app>
        <v-app-bar>
            <router-link to="/">
                <v-btn icon>
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>

            <v-toolbar-title>Back archi</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="account" @click="logOut">Log out</v-btn>

        </v-app-bar>
        <router-view/>
    </v-app>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            account: state => state.account.user
        })
    },
    methods: {
        ...mapActions('account', ['logout']),
        logOut(){
           this.logout()
        }
    }
}
</script>
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
