
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import {account} from "./account.module";
import {ticket} from "./ticket.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        account,
        ticket
    },
    plugins: [createPersistedState()]
});
