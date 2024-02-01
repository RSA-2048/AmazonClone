import Order from "../models/Order.js"

const addOrder = async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((item) => ({ ...item, product: item._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    })
    const order = await newOrder.save()
    res.status(201).send({ message: 'Order added successfully', order });
};

const getOrderById = async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    if (order) {
        res.status(200).send({ message: 'Order found', order })
    } else {
        res.status(404).send({ message: "Order not found" })
    }
};

// const addOrder = async (req, res) => {
//     const {
//         orderItems,
//         shippingAddress,
//         itemsPrice,
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//         user,
//     } = req.body;
//     const newOrder = new Order({
//         orderItem: orderItems.map((item) => ({ ...item, product: item._id })),
//         shippingAddress: shippingAddress,
//         itemsPrice: itemsPrice,
//         shippingPrice: shippingPrice,
//         taxPrice: taxPrice,
//         totalPrice: totalPrice,
//         user: user._id,
//     });
//     const order = await newOrder.save();
//     res.status(201).send({ message: 'Order added successfully' }, order);
// };

export { addOrder, getOrderById }