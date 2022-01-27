<template>
    <v-form ref="form" v-model="valid">
        <v-container class="flex align-center justify-center">
            <h1 class="text-center">Back-office Archi</h1>
            <v-card class="mx-auto pa-3" max-width="700px">
                <div class="ma-3">
                    <v-text-field
                        v-model="user.email"
                        :rules="emailRules"
                        label="Email"
                        outlined
                        required
                    ></v-text-field>
                </div>
                <div class="ma-3">
                    <v-text-field
                        v-model="user.password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                        outlined
                        required
                    ></v-text-field>
                </div>
                <v-card-actions>
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                    >
                        Login
                </v-btn>
                </v-card-actions>
                <div class="ma-3">
                    <router-link to="/register">Create a new account</router-link>
                </div>
            </v-card>
        </v-container>
    </v-form>
</template>

<script>
import {mapActions} from "vuex";
import {router} from "../router";

export default {
    name: 'home',
    components: {
    },
    data: () => ({
        valid: false,
        user: {
            email: '',
            password: ''
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
        ],
    }),
    methods: {
        ...mapActions("account", ["login"]),
        validate () {
            if(this.$refs.form.validate()){
                this.login(this.user)
            }
        },
    },
}
</script>
