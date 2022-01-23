<template>
    <v-form ref="form" v-model="valid">
    <v-card class="mx-auto pa-3" max-width="700px">
        <div class="ma-3">
            <v-text-field
                v-model="product.name"
                label="Product name"
                required
                outlined
            ></v-text-field>
        </div>
        <div class="ma-3">
            <v-text-field
                v-model="product.description"
                label="Description"
                outlined
            ></v-text-field>
        </div>
        <div class="ma-3">
            <span>Pictures inputted</span>
            <v-row>
                <v-col cols="2" v-for="image in imageArray" :key="image.id">
                    <v-img max-width="100px" max-height="100px" :src="image"></v-img>
                </v-col>
            </v-row>
        </div>
        <div class="ma-3">
            <v-text-field
                label="Url(s) of pictures"
                v-model="product.images"
                hint="Example : https://test.domain/image1, https://test.domain/image2"
                persistent-hint
                outlined
            ></v-text-field>
        </div>
        <div class="ma-3">
            <v-text-field
                label="Price"
                v-model="product.price.data[0].unit_amount"
                outlined
            ></v-text-field>
        </div>
        <div class="ma-3">
            <v-checkbox
                v-model="product.active"
                label="Active"
            ></v-checkbox>
        </div>
        <v-card-actions>
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
            >
                <span v-if="isEdit">Update</span>
                <span v-else>Create</span>
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "FormProduct",
    data: () => ({
        valid: false,
    }),
    computed: {
        imageArray() {
            return this.product.images.split(',')
        }
    },
    methods: {
        validate () {
            if(this.$refs.form.validate() === true){
                if(this.isEdit) {
                    this.updateProduct(this.product)
                }
                else {
                    this.createProduct(this.product)
                }
            }
        },
        ...mapActions('product', {
            updateProduct: 'updateProduct',
            createProduct: 'createProduct'
        }),
    },
    props: ['product', 'isEdit']
}
</script>

<style scoped>

</style>
