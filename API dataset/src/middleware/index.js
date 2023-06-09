const admin = require('../config/firebase-config');
class Middleware {

    async decodeToken(req, res, next ){
        const token = req.headers.authorization.split(' ')[1];

        try{

            const decodeValue = admin.auth().verifyIdToken(token);

            if(decodeValue){

                return next();

            }
        } catch(e){

            return res.json({Message : "un authorize"});

        }
    }
}

module.exports = new Middleware();