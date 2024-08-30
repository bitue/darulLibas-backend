const { Customer } = require('./Customer.model');

const getCustomerInfo = async (req, res, next) => {
    try {
        const getCustomers = await Customer.find({});

        if (getCustomers) {
            res.send({
                status: 'ok',
                getCustomers
            });
        } else {
            res.send({
                status: 'not found Customers'
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    getCustomerInfo
};
