import mongoose from 'mongoose';
import { verifyJwt } from '../services/jwtVerification.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KFIasJrsFsbQyAc9bKSqj90lKcIayaC1CiC9vsbRMcLwsJszAmZViSA7EeQbRWJIvdo49qV3YouMQHHUKIwuy2s00iU7sfc8i');


export const listProducts = (req, res) => {
    let promises = [];
    stripe.products.list({
        limit: 15,
    }).then(products => {
            products.data.forEach(product => {
                promises.push(
                    new Promise((resolve, reject) => {
                        stripe.prices.list({
                            active: true,
                            product: product.id
                        }).then(price => {
                            product.price = price
                            resolve()
                        })
                    })
                )
            })
        Promise.all(promises).then(() => {
            res.status(200).json(products)
        })
    })
};

export const getProduct = (req, res) => {
    stripe.products.retrieve(req.params.id).then(product => {
        res.status(200).json(product)
    }).catch(error => {
        res.status(500).json(error)
    })
};


export const createProduct = (req, res) => {
    stripe.products.create({
        name: req.body.name,
        description: req.body.description,
        images: req.body.images.split(','),
        active: req.body.active
    }).then(product => {
        stripe.prices.create({
            unit_amount: req.body.price.data[0].unit_amount,
            currency: 'eur',
            product: product.id
        }).then(price => {
            product.price = price
            res.status(201).json(product)
        })
    })
}
export const updateProduct = (req, res) => {
    stripe.products.update(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images.split(','),
        active: req.body.active
    }).then(product => {
        stripe.prices.update(req.body.price.data[0].id, {
            active: false
        }).then(() => {
            stripe.prices.create({
                unit_amount: req.body.price.data[0].unit_amount,
                currency: 'eur',
                product: req.params.id
            }).then(price => {
                product.price = price
                res.status(200).json(product)
            }).catch(error => {
                res.status(500).json(error)
            })
        })
    }).catch(error => {
        res.status(500).json(error)
    })
};

export const changeVisibilityProduct = (req, res) => {
    stripe.products.update(req.params.id, {
        active: req.body.active
    }).then(product => {
        res.status(200).json(product)
    })
}
