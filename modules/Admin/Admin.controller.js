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

const changePasswordAdmin = async (req, res, next) => {
    try {
        const { newPassword, password, admin } = req.body;
        console.log(newPassword, password);

        // Fetch the user by ID
        const user = await Admin.find({ admin });
        console.log(user, 'user find ----------------------');
        if (!user) {
            return res.status(404).send({ status: 'User not found' });
        }
        console.log(user[0].password, 'userPass');

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user[0].password);
        console.log(isMatch, 'is match---------------');

        if (!isMatch) {
            return res.status(400).send({ status: 'Password is incorrect' });
        }

        // Hash the new password
        const hashPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await Admin.updateOne({ admin: admin }, { password: hashPassword });

        // Send a success response
        res.send({ status: 'Password changed successfully' });
    } catch (err) {
        console.log(err.message);
        next(err); // Pass the error to the error-handling middleware
    }
};

module.exports = {
    createAdmin,
    deleteAdmin,
    getAllAdmin,
    changePasswordAdmin
};
