import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true // can show us when the user created and added to the DB
});

const User = mongoose.model("User", userSchema); // we will work with this User variable in our app

export default User;