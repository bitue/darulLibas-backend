const JWT = require('jsonwebtoken');
const Admin = require('../modules/Admin/Admin.model');

require('dotenv').config();

const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(1);

    if (!authorization) {
        res.status(401).send('Unauthorized 1 !');
    } else {
        try {
            console.log(authorization);
            const token = authorization.split(' ')[1];
            console.log(token, 'check token');

            const decode = JWT.verify(token, process.env.JWT_SECRET);
            // check to database again !
            console.log(decode);

            const adminDb = await Admin.findOne({
                $and: [{ email: decode.email }, { role: decode.role }, { _id: decode.id }]
            });
            if (adminDb) {
                // all ok !
                req.tokenPayLoad = adminDb;

                console.log(adminDb, 'adminDB');
            }

            // if user not found in database
            if (!adminDb) {
                res.status(401).send({
                    status: 'NOT_OK'
                });
            }

            next();
        } catch ({ message }) {
            next(message);
        }
    }
};

module.exports = {
    checkToken
};
