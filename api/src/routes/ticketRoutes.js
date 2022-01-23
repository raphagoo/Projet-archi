import { createTicket, listTickets, getTicket, updateTicket } from "../controllers/ticketController.js";

export const ticketRoutes = (app) => {
    app.route('/ticket')
        .get(listTickets);

    app.route('/ticket')
        .post(createTicket);

    app.route('/ticket/:id')
        .get(getTicket);

    app.route('/ticket/:id')
        .put(updateTicket);
}
