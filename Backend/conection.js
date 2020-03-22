const mysql = require("mysql");

const password = process.env.MONEY_APP_DB_PASSWORD || 'rootroot';

var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: password,
    database: 'money_control',
    multipleStatements: true
})

connection.connect((err) =>{
    if(!err){
        console.log("Connected!!")
    }
    else{
        console.log("Connection Failed!!")
    }

})

module.exports = connection;