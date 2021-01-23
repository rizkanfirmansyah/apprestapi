var connection = require('../koneksi');
var response = require('../res');
var config = require('../config/secret')
var mysql = require('mysql');
var md5 = require('MD5');
var jwt = require('jsonwebtoken');
var ip = require('ip');
const conn = require('../koneksi');

// Register Controller 
exports.register = function(req, res) {
    var post = {
        username : req.body.username,
        email : req.body.email,
        password : md5(req.body.password),
        role : req.body.role,
    }

    var query = "SELECT email FROM ?? WHERE ??=? ";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows, fields) {
        if(error){
            console.log(error); 
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows)  {
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("User berhasil ditambahkan!", res)
                    }
                })
            }else{
                response.ok("Email sudah terdaftar!", res);
            }
        }
    })
}
