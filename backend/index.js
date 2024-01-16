import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();

app.use(cors()); // define who can access our server
app.use(express.json()); // for parsing json
app.use(express.urlencoded({ extended: false })); // mainly for working with from data 


// routes
app.post('/addUser', async (req, res) => { // async function because we are interacting with the DB
    // const user = req.body.user;
    //const { user } = req.body;
    const newUser = await User.create(req.body);
    res.send(newUser);
})

mongoose.connect("mongodb+srv://lezendaniel:K8utPFOheCTc2IJn@cluster0.gxgp3br.mongodb.net/AmazonClone?retryWrites=true&w=majority").then(() => {
    app.listen(8080, function () {
        console.log("Listening on 8080");
    })
}).catch(err => { console.log(err.message); });


