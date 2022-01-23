<template>
    <v-container>
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
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "Home",
    data () {
        return {
            headers: [
                {
                    text: 'Title',
                    align: 'start',
                    sortable: false,
                    value: 'title',
                },
                {text: 'Order', value: 'order_id'},
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
        })
    },
    created() {
        this.listTicket()
        this.listUser()
    }
}
</script>

<style scoped>

</style>
