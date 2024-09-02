const Admin = require('./Admin.model');
const bcrypt = require('bcrypt');

// try {
//     const {admin, password , phone } = req.body
//     const setAdmin = await Admin.create({admin, password, phone})

// } catch(err){
//     console.log(err.message)
//     next(err.message)
// }

const createAdmin = async (req, res, next) => {
    try {
        const { admin, password, phone } = req.body;
        // bcrypt password
        const hashPassword = await bcrypt.hash(password, 10);

        const setAdmin = await Admin.create({ admin, password: hashPassword, phone });
        res.send({ setAdmin, status: 'okay' });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.body;
        const deletedAdmin = await Admin.findByIdAndDelete({ _id: id });

        if (!deletedAdmin) {
            throw new Error('Admin not found');
        }

        res.send({ status: 'admin deleted successfully .....' });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getAllAdmin = async (req, res, next) => {
    try {
        const allAdmins = await Admin.find({});
        res.send({ admin: allAdmins, status: 'okay' });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    createAdmin,
    deleteAdmin,
    getAllAdmin
};
