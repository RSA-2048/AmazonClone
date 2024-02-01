import Order from "../models/Order"

// const addOrder = async (req, res) => {
//     const newOrder = new Order({
//         orderItems: req.body.orderItems.map((item) => ({ ...item, product: item._id })),
//         shippingAddress: req.body.shippingAddress,
//         itemsPrice: req.body.itemsPrice,
//         shippingPrice: req.body.shippingPrice,
//         taxPrice: req.body.taxPrice,
//         totalPrice: req.body.totalPrice,
//         user: req.user._id

//     })
// };

const addOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user,
    } = req.body;
    const newOrder = new order({
        orderItem: orderItems.map((item) => ({ ...item, product: item._id })),
        shippingAddress: shippingAddress,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        user: user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'Order added successfully' }, order);
};

export { addOrder }