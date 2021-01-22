var mysql = require('mysql');

// Buat koneksi database
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password :'',
    database : 'restapimahasiswa'
})

conn.connect((err)=>{
    if(err) throw err;
    console.log('Database terkoneksi');
});

module.exports = conn;