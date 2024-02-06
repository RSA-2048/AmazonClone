import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.send(products);
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product was not found" });
    }
};

const getProductByToken = async (req, res) => {
    const { token } = req.params;
    const product = await Product.findOne({ token: token });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product was not found" });
    }
}

const getCategories = async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
}

export { getProducts, getProductById, getProductByToken, getCategories };