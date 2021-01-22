'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi REST API telah berjalan!", res)
};

// menampilkan data mahasiswa
exports.getmahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

// menampilkan data mahasiswa berdasarkan id
exports.getmahasiswabyid = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],  function(error, rows, fields) {
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

// Menambahkan data mahasiswa
exports.insertmahasiswa = function(req, res)  {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?, ?, ?)', 
    [nim, nama, jurusan],
    function(error, rows, fields) {
        if(error){
            console.log(error);
        }else{
            response.ok('Berhasil Menambahakan Data!', res)
        }
    });
};

// Mengubah data mahasiswa
exports.updatemahasiswa = function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    var id = req.body.id_mahasiswa;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim,nama,jurusan, id], function(error, rows, fields) {
        if(error){
            console.log(error);
        }else{
            response.ok('Berhasil mengubah data', res)
        }
    });
};