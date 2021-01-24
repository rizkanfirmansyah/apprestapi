const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function  verify(roles) {
    return function(req, rest, nect) {
        // check authorization header
        var tokenWithHeader = req.header.authorization;
        if (tokenWithHeader) {
            var token = tokenWithHeader.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function(error, decoded) {
                if (error) {
                    // console.log(error);
                    return rest.status(401).send({auth:false, message:'Token tidak valid'});
                }else{
                    if(roles == 1){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message:'Authorization role access failed'});
                    }
                }
            });

        }else{
            return rest.status(401).send({auth:false, message:'Token tidak tersedia'});
        }

    }
}

module.exports = verify;