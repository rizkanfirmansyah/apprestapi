'use strict';

module.exports = function(app) {
    var jsonme = require('./controller');

    app.route('/')
        .get(jsonme.index);
}