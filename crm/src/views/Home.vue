<template>
    <v-container>
        <h1 class="text-center">Home</h1>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="tickets"
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Tickets</v-toolbar-title>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" @click="openTicket(item)">
                            Details
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
            <v-col>
                <v-data-table
                    :headers="headersUsers"
                    :items="users"
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Users</v-toolbar-title>
                        </v-toolbar>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog">
            <v-form ref="form">
                <v-card class="pa-3">
                    <h2 class="pa-3">{{ticket.title}}</h2>
                    <div class="ma-3">
                        <v-text-field
                            v-model="ticket.emitter.email"
                            label="Author"
                            required
                            disabled
                        ></v-text-field>
                    </div>
                    <div class="ma-3">
                        <v-text-field
                            v-model="ticket.subtitle"
                            label="Title"
                            required
                            disabled
                        ></v-text-field>
                    </div>
                    <div class="ma-3">
                        <v-textarea
                            v-model="ticket.description"
                            label="Description"
                            required
                            disabled
                        ></v-textarea>
                    </div>
                    <v-card-actions>
                        <v-btn color="error">Refund</v-btn>
                        <v-btn color="primary">Respond</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "Home",
    data () {
        return {
            dialog: false,
            ticket: {emitter: {}},
            headers: [
                {
                    text: 'Title',
                    align: 'start',
                    sortable: false,
                    value: 'title',
                },
                {text: 'Order', value: 'order_id'},
                {text: 'Actions', value: 'actions'},
            ],
            headersUsers: [
                {
                    text: 'Email',
                    align: 'start',
                    sortable: false,
                    value: 'email',
                },
                {text: 'stripe_id', value: 'stripe_id'},
            ],
        }
    },
    computed: {
        ...mapState({
            tickets: state => state.ticket.list,
            users: state => state.account.list
        })
    },
    methods: {
        ...mapActions('ticket', {
            listTicket: 'listTicket'
        }),
        ...mapActions('account', {
            listUser: 'listUser'
        }),
        openTicket(ticket){
            this.ticket = ticket
            this.dialog = true
        }
    },
    created() {
        this.listTicket()
        this.listUser()
    }
}
</script>

<style scoped>

</style>
