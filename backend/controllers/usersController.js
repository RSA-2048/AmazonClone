import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js";

// const getUsers = async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// };

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password)
    });


    const user = await newUser.save();

    // we don't need the password
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user)
    })
}

const signin = async (req, res) => {
    const { password: passwordFromWebsite, email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        if (bcrypt.compareSync(passwordFromWebsite, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({ message: "Invalid User/Password" });
};

export { signup, signin };