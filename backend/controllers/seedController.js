import User from '../models/User.js';
import Product from '../models/Product.js';
import data from '../data.js';

const seedData = async (req, res) => {
    await User.deleteMany();
    await Product.deleteMany();

    const users = await User.insertMany(data.users);
    const products = await Product.insertMany(data.products);
    res.send({ users, products });
};

export default seedData