const { Query } = require('./Query.model');

const getQuery = async (req, res, next) => {
    try {
        const getQuery = await Query.find({});
        res.send({
            getQuery,
            status: 'OK'
        });
    } catch ({ message }) {
        res.send({
            message
        });
    }
};

const addQuery = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;
        const saveQuey = await Query.create({ name, email, phone, message });

        res.send({
            saveQuey,
            status: 'OK'
        });
    } catch ({ message }) {
        res.send({
            message
        });
    }
};

const closeQuery = async (req, res, next) => {
    try {
        const { id } = req.body;
        const dQuey = await Query.findByIdAndDelete({ _id: id });

        res.send({
            dQuey,
            status: 'OK'
        });
    } catch ({ message }) {
        res.send({
            message
        });
    }
};

module.exports = {
    addQuery,
    getQuery,
    closeQuery
};
