import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // define who can access our server
app.use(express.json()); // for parsing json
app.use(express.urlencoded({ extended: false })); // mainly for working with from data 


// routes

app.listen(8080, function () {
    console.log("Listening on 8080");
})

