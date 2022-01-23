import {router} from "../router";

const state = {};
import api from '../interfaces/apiInterface';
import timeService from "../interfaces/time.service";

const actions = {
    listProducts({commit}){
        api.get('/product/list').then(products => {
            commit('listProductsSuccess', products)
        })
    },
    getProduct({commit}, id){
        api.get('/product/' + id).then(product => {
            commit('getProductSuccess', product)
        })
    },
    createProduct({commit}, product){
        api.post('/product', product).then(product => {
            commit('createProductSuccess', product)
        })
    },
    updateProduct({commit}, product){
        api.put('/product/' + product.id, product).then(product => {
            commit('updateProductSuccess', product)
        })
    },
    changeVisibilityProduct({commit}, product) {
        api.put('/product/hide/' + product.id, product).then(product => {
            commit('changeVisibilitySuccess', product)
        })
    }
};

const mutations = {
    listProductsSuccess(state, products){
        products.data.data.forEach(product => {
            product.directPrice = (product.price.data[0].unit_amount * 1.0 / 100) + ' €'
            product.created = timeService.timeConverter(product.created)
            product.updated = timeService.timeConverter(product.updated)
        })
        state.list = products.data.data
    },
    getProductSuccess(state, product){
        state.selected = product.data
    },
    createProductSuccess(state, product){
        state.list.push(product.data)
        router.push('/')
    },
    // eslint-disable-next-line no-unused-vars
    updateProductSuccess(state, product){
        router.push('/')
    },
    changeVisibilitySuccess(state, product){
        state.list.forEach(item => {
            if(item.id === product.id){
                item.active = product.active
            }
        })
    }
};

export const product = {
    namespaced: true,
    state,
    actions,
    mutations
};
