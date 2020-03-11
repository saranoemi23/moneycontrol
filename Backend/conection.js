const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'rootroot',
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