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

const changeOrderStatus = async (req, res, next) => {
    try {
        const orderStatusArray = ['arrived', 'approved', 'done'];
        let { id, status, proceed } = req.body;
        let idx = orderStatusArray.indexOf(status);
        if (
            (idx === 0 && proceed === 'prev') ||
            (idx === orderStatusArray.length - 1 && proceed === 'next')
        ) {
            res.send({
                status: 'Invalid order status to change'
            });
        }
        let newStatus;
        if (proceed === 'next') {
            idx = idx + 1;
            newStatus = orderStatusArray[idx];
        } else {
            newStatus = orderStatusArray[idx - 1];
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id }, // Find order with status 'arrived'
            { orderStatus: newStatus }, // Update status to 'pending'
            { new: true } // Return the updated document
        );

        if (updatedOrder) {
            console.log('Order status updated successfully:', updatedOrder);
            res.send({
                status: 'Order status updated successfully:',
                updatedOrder
            });
        } else {
            console.log('No order found with the status "arrived"');
            res.send({
                status: 'No order found with the status arrived'
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const getAllOrders = await Order.find({})
            .populate('customerInfo')
            .populate('shoppingInfo')
            .sort({ _id: -1 });
        if (getAllOrders) {
            res.send({
                status: 'ok',
                getAllOrders
            });
        } else {
            res.send({
                status: 'not found orders',
                getAllOrders: []
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getAllSuccessfulOrders = async (req, res, next) => {
    try {
        const getAllOrders = await Order.find({ orderStatus: 'done' })
            .populate('customerInfo')
            .populate('shoppingInfo');
        if (getAllOrders) {
            res.send({
                status: 'ok',
                getAllOrders
            });
        } else {
            res.send({
                status: 'not found orders',
                getAllOrders: []
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.body;
        const getOrder = await Order.find({ _id: id })
            .populate('customerInfo')
            .populate('shoppingInfo');
        if (getAllOrders) {
            res.send({
                status: 'ok',
                getOrder
            });
        } else {
            res.send({
                status: 'not found orders'
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const deleteOrderById = async (req, res, next) => {
    try {
        const { id } = req.body;

        //console.log(req);
        const getOrder = await Order.findById({ _id: id });
        //console.log(getOrder, '------------------');
        // del the customer info
        await Customer.findByIdAndDelete({ _id: getOrder.customerInfo });
        // del the shopping info
        await Shopping.findByIdAndDelete({ _id: getOrder.shoppingInfo });
        // delete the order info from db
        const delOrder = await Order.findByIdAndDelete({ _id: id });
        // console.log(delOrder, ' dellllllllll');

        res.send({
            status: 'Okay ',
            delOrder
        });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    makeOrder,
    changeOrderStatus,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    getAllSuccessfulOrders
};
