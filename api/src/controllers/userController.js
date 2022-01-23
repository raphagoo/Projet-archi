import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserSchema } from "../models/userModel.js";
import { TicketSchema } from "../models/ticketModel.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KFIasJrsFsbQyAc9bKSqj90lKcIayaC1CiC9vsbRMcLwsJszAmZViSA7EeQbRWJIvdo49qV3YouMQHHUKIwuy2s00iU7sfc8i');
import bcrypt from 'bcrypt';

const User = mongoose.model('User', UserSchema);
const Ticket = mongoose.model('Ticket', TicketSchema);

export const createUser = (req, res) => {
    let newUser = new User(req.body);

    stripe.customers.create({
        email: newUser.email
    }).then(customer => {
        newUser.stripe_id = customer.id

        newUser.save((err, user) => {
            if (err) {
                res.status(400).send(err);
            } else {
                //let token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data: user}, 'mySuperSecrett');
                //let response = {user: user,token: token}
                res.status(201).json(user);
            }
        })
    })
};

export const listUsersLocal = (req, res) => {
    User.find({})
        .exec((err, users) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(users)
            }
        });
};

export const listUsers = (req, res) => {
    stripe.customers.list({
        limit: 15
    }).then(customers => {
        res.status(200).json(customers)
    })
};

export const getUser = (req, res) => {
    stripe.customers.retrieve(req.params.stripe_id).then(customer => {
        res.status(200).json(customer)
    })
};

export const listCustomerPayments = (req, res) => {
    let promises = []
    stripe.paymentIntents.list().then(payments => {
        payments = payments.data.filter(payment => payment.status === 'succeeded')
        payments.forEach(payment => {
            promises.push(
                new Promise((resolve, reject) => {
                    stripe.customers.retrieve(payment.customer).then(customer => {
                        payment.customer = customer
                        resolve()
                    })
                })
            )
        })
        Promise.all(promises).then(() => {
            Ticket.find({})
                .exec((err, tickets) => {
                    let paymentsArray = Array.from(payments)
                    tickets.forEach(ticket => {
                        paymentsArray.forEach(payment => {
                            if(ticket.order_id === payment.id){
                                payment.ticket = ticket
                            }
                        })
                    })
                    res.status(200).json(paymentsArray)
                })
        })
    })
};

export const login = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((err, user) => {
        if (user === null) {
            res.sendStatus(404)
        }
        else{
            bcrypt.compare(req.body.password, user.password, function(err, response) {
                if(response) {
                    let token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data: {email: user.email}}, 'mySuperSecrett');
                    const response = {user: user, token: token}
                    res.status(200).json(response)
                } else {
                    res.sendStatus(404)
                } 
              });
        }
    });
   
};

export const updateUser = (req, res) => {
    User.findOneAndUpdate({"_id": req.params.id}, req.body, {new: true, useFindAndModify: false})
    .exec((err, user) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.status(200).json(user);
            }
        }
    });
};

export const deleteUser = (req, res) => {
    User.findOneAndDelete({"_id": req.params.id}, (err, user) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(204);
            }
        }
    });
};
