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

    var query = "SELECT email FROM ?? WHERE ??=?";
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

// Controller Login
exports.login = function(req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ['user', 'password', md5(post.password), 'email', post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret,{
                    expiresIn: 1440
                });
                id_user = rows[0].id;

                var data = {
                    id_user : id_user,
                    access_token : token,
                    ip_address : ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ['akses_token'];
                
                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if(error){
                        console.log(error); 
                    }else{
                        res.json({
                            success:true,
                            message:'Token JWT berhasil di generate',
                            token:token,
                            currUser: data.id_user,
                        })
                    }
                })
            }else{
                res.json({
                    "Error" :true,
                    "Message" : "Email atau password salah"
                });
            }
        }
    })
}
