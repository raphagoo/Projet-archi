<template>
    <v-container>
        <v-form ref="passwordCheckForm">
            <h1 class="text-center">Check password</h1>
            <v-card class="mx-auto pa-3" max-width="700px">
                <div class="ma-3">
                    <v-text-field
                        v-model="user.email"
                        label="User email"
                        required
                        outlined
                    ></v-text-field>
                </div>
                <div class="ma-3">
                    <v-text-field
                        v-model="user.password"
                        label="User password"
                        type="password"
                        required
                        outlined
                    ></v-text-field>
                </div>
                <div class="ma-3">
                    <v-text-field
                        v-model="user.secretKey"
                        label="Secret key"
                        type="password"
                        required
                        outlined
                    ></v-text-field>
                </div>
                <div class="ma-3">
                    <v-checkbox label="Admin (uncheck if Market)" v-model="user.isAdmin"></v-checkbox>
                </div>
                <v-card-actions>
                    <v-btn @click="validate()">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
import {mapActions} from "vuex";
import Swal from "sweetalert2";
import {router} from "../router";

export default {
    name: "Register",
    data(){
        return{
            user: {
                password: '',
                email: '',
                isAdmin: true,
                secretKey: ''
            },
        }
    },
    methods: {
        ...mapActions('account', ['register']),
        validate(){
            if(this.$refs.passwordCheckForm.validate()){
                this.register(this.user).then(response => {
                    console.log(response)
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'L\'administateur a été créé'
                    }).then(() => {
                        router.push('/login')
                    })
                    }
                )
            }
        }
    }
}
</script>

<style scoped>

</style>
