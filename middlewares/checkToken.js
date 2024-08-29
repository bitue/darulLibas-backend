const JWT = require('jsonwebtoken');

require('dotenv').config();

const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send('Unauthorized 1 !');
    } else {
        try {
            // console.log(authorization);
            const token = authorization.split(' ')[1];

            const decode = JWT.verify(token, process.env.JWT_SECRET);
            // check to database again !
            console.log(decode);

            const adminDb = await Admin.findOne({
                $and: [{ email: decode.email }, { role: decode.role }, { _id: decode.id }]
            });
            console.log(adminDb, 'adminDB');
            // if user not found in database
            if (!userDb) {
                res.status(401).send('Unauthorized 2 !');
            }

            // all ok !
            req.tokenPayload = adminDb;

            next();
        } catch (err) {
            res.status(504).send(err.message);
        }
    }
};

module.exports = {
    checkToken
};
