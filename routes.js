'use strict';

module.exports = function(app) {
    var jsonme = require('./controller');

    app.route('/')
        .get(jsonme.index);

    app.route('/mahasiswa')
        .get(jsonme.getmahasiswa);

    app.route('/mahasiswa/:id')
        .get(jsonme.getmahasiswabyid);

    app.route('/insert')
        .post(jsonme.insertmahasiswa);
    
    app.route('/update')
        .put(jsonme.updatemahasiswa);

    app.route('/delete')
        .delete(jsonme.deletemahasiswa);

    app.route('/matakuliah')
        .get(jsonme.getgroupmatakuliah);
}