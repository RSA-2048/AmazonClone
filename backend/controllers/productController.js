import Product from "../models/Product"

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.send(products);
}

export default getProducts;