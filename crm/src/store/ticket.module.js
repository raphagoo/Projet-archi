const state = {};
import api from '../interfaces/apiInterface';

const actions = {
    createTicket({commit}, ticket){
        api.post('/ticket', ticket).then(() => {
            commit('createTicketSuccess')
        })
    },
    listTicket({commit}){
        api.get('/ticket').then(tickets => {
            commit('listTicketSuccess', tickets)
        })
    },
};

const mutations = {
    createTicketSuccess(){

    },
    listTicketSuccess(state, tickets){
        state.list = tickets.data
    },
};

export const ticket = {
    namespaced: true,
    state,
    actions,
    mutations
};
