const express = require("express");
const Router = express.Router();

Router.use(function (req, res, next) {
    const usuario = req.session.userId;
    // si no está logueado, no seguir
    if (!usuario) {
        res.sendStatus(403);
        return res.end();
    }
    next();
})

Router.get('/get', (req, res) => {
    const connection = req.app.get('connection');

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