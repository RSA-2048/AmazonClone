import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import usersRouter from "./routes/usersRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();

dotenv.config();

app.use(cors()); // define who can access our server
app.use(express.json()); // for parsing json
app.use(express.urlencoded({ extended: false })); // mainly for working with from data 

const PORT = process.env.PORT || 8080; // set 8080 for default port name if it does not exist in the env

// api routes
app.use('/api/v1/seed', seedRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/orders", orderRouter);
app.use((err, req, res, next) => { // for when the entered route does not exist
    res.status(500).send({ message: err.message })
})

// app.post('/addUser', async (req, res) => { // async function because we are interacting with the DB
//     // const user = req.body.user;
//     //const { user } = req.body;
//     const newUser = await User.create(req.body);
//     res.send(newUser);
// })

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    app.listen(PORT, function () {
        console.log("Listening on " + PORT);
    })
}).catch(err => { console.log(err.message); });


