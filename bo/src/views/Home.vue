<template>
    <v-container>
        <h1 class="text-center">Home</h1>
        <router-link to="/create"><v-btn class="cyan ma-3">Create product</v-btn></router-link>
        <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="10"
            class="elevation-1"
        >
            <template v-slot:item.active="{ item }">
                <v-checkbox v-model="item.active" disabled></v-checkbox>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn @click="changeVisibilityProduct(item)" icon>
                    <v-icon v-if="item.active">visibility_off</v-icon>
                    <v-icon v-else>visibility_on</v-icon>
                </v-btn>
                <v-btn @click="editProduct(item)" icon>
                    <v-icon>edit</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {router} from "../router";

export default {
    name: "Home",
    data () {
        return {
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Description', value: 'description'},
                {text: 'Price', value: 'directPrice'},
                {text: 'Created', value: 'created'},
                {text: 'Last update', value: 'updated'},
                {text: 'Actions', align:'center', value: 'actions'},
            ],
        }
    },
    computed: {
        ...mapState({
            account: state => state.account,
            products: state => state.product.list
        })
    },
    methods: {
        ...mapActions('product', {
            listProducts: 'listProducts',
            changeVisibility: 'changeVisibilityProduct'
        }),
        editProduct(product){
            router.push('/edit/' + product.id)
        },
        changeVisibilityProduct(product){
            product.active = !product.active
            this.changeVisibility(product)
        }
    },
    created() {
        this.listProducts()
    }
}
</script>

<style scoped>

</style>
