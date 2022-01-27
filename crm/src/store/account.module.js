import api from '../interfaces/apiInterface';
import { default as log } from '../interfaces/consoleLogger'
import {router} from "../router";

const token = localStorage.getItem('token');
const state = token
    ? { status: { loggedIn: true }, token, user: {} }
    : { status: {}, user: null };

const actions = {
    //Connexion
    login({commit}, user){
        return new Promise((resolve, reject) => {
            commit('loginRequest', user);
            api.post('/user/loginMarket', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        localStorage.setItem('token', response.data.token)
                        commit('loginSuccess', response.data.user)
                        resolve(response)
                    }).catch(
                error => {
                    log.info('Erreur : ', error)
                    reject(error)
                }
            );
        })
    },

    register({commit}, user){
        return new Promise((resolve, reject) => {
            commit('registerRequest', user);
            api.post('/user/register', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        commit('registerSuccess', response.data.user)
                        resolve(response)
                    }
                ).catch(error => {
                log.info('Erreur : ', error)
                reject(error)
            })
        })
    },

    logout({commit}){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        commit('logoutSuccess')
    },

    listUser({commit}){
        api.get('/user').then(users => {
            commit('listUserSuccess', users)
        })
    },
}

const mutations = {
    loginRequest(){
        log.info('account.module.login.request')
    },
    loginSuccess(state, user){
        log.info('account.module.login.success')
        state.user = user
        router.push('/')
    },
    registerRequest(){
        log.info('account.module.register.request')
    },
    registerSuccess(){
        log.info('account.module.register.success')
    },
    logoutSuccess(state){
        log.info('account.module.logout.success')
        state.user = null
    },
    listUserSuccess(state, users){
        log.info('account.module.listUser.success')
        state.list = users.data
    },
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
