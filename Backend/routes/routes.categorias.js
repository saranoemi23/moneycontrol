const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todas las categorias")

    const queryString = `select id, descripcion from categoria`

    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay categorias " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Categorias seleccionadas")
        res.json(rows)
    })
});

module.exports = Router;