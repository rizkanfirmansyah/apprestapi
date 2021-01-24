const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
    return function(req, rest, next) {
        var role = req.body.role;
        // check authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function(error, decoded) {
                if (error) {
                    // console.log(error);
                    return rest.status(401).send({ auth: false, message: 'Token tidak valid' });
                } else {
                    if (role == 1) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({ auth: false, message: 'Authorization role access failed' });
                    }
                }
            });

        } else {
            return rest.status(401).send({ auth: false, message: 'Token tidak tersedia' });
        }

    }
}

module.exports = verifikasi;