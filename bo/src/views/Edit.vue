<template>
   <v-container class="flex align-center justify-center">
       <h1 class="text-center">Edit</h1>
       <form-product v-bind:product="product" v-bind:isEdit="true"></form-product>
   </v-container>
</template>

<script>
import FormProduct from "../components/FormProduct.vue";

export default {
    name: "Edit",
    components: {FormProduct},
    computed: {
        product: {
            get() {
                let product = this.$store.state.product.list.find(item => item.id === this.$route.params.productId)
                product.images = product.images.join()
                return product
            },
            set(value){
                console.log(value)
            }
        }
    },
}
</script>

<style scoped>

</style>
