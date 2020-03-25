const mysql = require("mysql");

const password = process.env.MONEY_APP_DB_PASSWORD || 'rootroot';

const options = {
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'money_control',
    multipleStatements: true
};

var connection = mysql.createConnection(options)

connection.connect((err) =>{
    if(!err){
        console.log("Connected!!")
    }
    else{
        console.log("Connection Failed!!")
    }

})

module.exports = { connection, options };