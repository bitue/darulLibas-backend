const { Customer } = require('../Customer/Customer.model');
const { Shopping } = require('../Shopping/Shopping.model');
const { Order } = require('./Order.model');

const makeOrder = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            productInfoArray,
            areaStatus,
            paymentStatus,
            totalPrice
        } = req.body;

        // const { productImg, productQty, productName, productId, productSize, productPrice } =
        //     productInfoArray;
        const productInfo = [];
        for (const product of productInfoArray) {
            console.log(product);
            const saveProduct = await Shopping.create(product);
            productInfo.push(saveProduct._id);
        }

        const saveCustomerInfo = await Customer.create({ name, email, phone, address });
        console.log(1);
        console.log(productInfo);
        const saveOrderInfo = await Order.create({
            shoppingInfo: productInfo,
            customerInfo: saveCustomerInfo._id,
            areaStatus,
            paymentStatus,
            totalPrice
        });

        res.send({ status: 'Order added Successfully ...', orderInfo: saveOrderInfo });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    makeOrder
};
