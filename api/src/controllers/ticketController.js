import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { TicketSchema } from "../models/ticketModel.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KFIasJrsFsbQyAc9bKSqj90lKcIayaC1CiC9vsbRMcLwsJszAmZViSA7EeQbRWJIvdo49qV3YouMQHHUKIwuy2s00iU7sfc8i');

const Ticket = mongoose.model('Ticket', TicketSchema);

export const createTicket = (req, res) => {
    let newTicket = new Ticket(req.body);

    newTicket.save().then(ticket => {
        res.status(201).json(ticket);
    }).catch(err => {
        res.status(400).send(err);
    })
};

export const listTickets = (req, res) => {
    Ticket.find({})
        .exec((err, tickets) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(tickets)
            }
        });
};

export const getTicket = (req, res) => {
    Ticket.findById(req.params.id)
        .exec((err, ticket) => {
            if(err) {
                res.status(400).send(err);
            } else if(ticket == null) {
                res.sendStatus(404)
            } else {
                res.status(200).json(ticket)
            }
        });
};

export const updateTicket = (req, res) => {
    Ticket.findOneAndUpdate({"_id": req.params.id}, req.body, {new: true, useFindAndModify: false})
        .exec((err, ticket) => {
            if(err) {
                res.status(400).send(err);
            } else {
                if(ticket == null) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).json(ticket);
                }
            }
        });
};

export const deleteTicket = (req, res) => {
    Ticket.findOneAndDelete({"_id": req.params.id}, (err, ticket) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if(ticket == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(204);
            }
        }
    });
};
