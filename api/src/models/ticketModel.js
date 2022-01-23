import mongoose from "mongoose";
import { default as autopopulate } from "mongoose-autopopulate";
let Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const TicketSchema = new Schema({
    emitter: {
        type: ObjectId,
        ref: 'User',
        autopopulate: true,
        required: 'emitter required'
    },
    title: {
        type: String,
        required: 'title required'
    },
    subtitle: {
        type: String,
        required: 'subtitle required'
    },
    description: {
        type: String,
        required: 'description required'
    },
    order_id: {
        type: String,
        required: 'orderId required'
    }
});

TicketSchema.plugin(autopopulate);
