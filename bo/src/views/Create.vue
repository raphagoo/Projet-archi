<template>
    <v-container class="flex align-center justify-center">
        <h1 class="text-center">Create</h1>
        <form-product v-bind:product="product" v-bind:isEdit="false"></form-product>
    </v-container>
</template>

<script>
import FormProduct from "../components/FormProduct.vue";

export default {
    name: "Create",
    components: {FormProduct},
    data(){
        return {
            product: {
                name: '',
                price: {data: [{unit_amount: ''}]},
                description: '',
                images: '',
                active: true
            }
        }
    }
}
</script>

<style scoped>

</style>
