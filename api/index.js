import express from 'express';
let app = express();
import http from 'http';
let server = http.createServer(app);


import mongoose from 'mongoose';


import { userRoutes } from "./src/routes/userRoutes.js";
import { productRoutes } from "./src/routes/productRoutes.js";
import { ticketRoutes } from "./src/routes/ticketRoutes.js";


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

export const autoIncrement = import('mongoose-auto-increment');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/projet-archi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if(error) {
        console.log(error);
        process.exit(1);       
    }
});

// Routes initialisation
userRoutes(app);
productRoutes(app);
ticketRoutes(app);


server.listen(process.env.PORT || 3000,
    console.log(`listening`)
);

