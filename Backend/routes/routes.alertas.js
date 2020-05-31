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
    const usuario = req.session.userId;

    console.log("Seleccionar todas las alertas")

    const queryString = `SELECT id, descripcion, fecha, repetir, fechaoriginal, idusuario 
                        FROM    money_control.alerta 
                        where   idusuario =?`;

    connection.query(queryString,[usuario],(err, rows, fields) => {
        if(err){
            console.log("No hay categorias por alertas" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Alertas por usuario seleccionadas")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{
    const connection = req.app.get('connection');
    const usuario = req.session.userId;

    console.log("Tratando de agregar alertas por usuario..")
    console.log("descripcion: "+ req.body.descripcion)
    console.log("fecha: "+ req.body.fecha)
    console.log("repetir: "+ req.body.repetir)
    console.log("fechaoriginal: "+ req.body.fechaoriginal)
    console.log("idusuario: "+ req.body.idusuario)

    const descripcion = req.body.descripcion
    const fecha = req.session.fecha;
    const repetir = req.body.repetir
    const fechaoriginal = req.body.fechaoriginal

    const queryString = `INSERT INTO money_control.alerta
                        (
                        descripcion,
                        fecha,
                        repetir,
                        fechaoriginal,
                        idusuario)
                        VALUES
                        (?,?,?,?,?)`
    connection.query(queryString, [descripcion, fecha, repetir, fechaoriginal, usuario], (err, results, fields) =>{
        if (err){
            console.log("Error al agregar la alertas: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego alerta con id: ", results.insertId);
        res.end()

    } )
});

Router.post('/edit/:id', (req, res) =>{
    const connection = req.app.get('connection');

    console.log("Tratando de agregar alertas por usuario..")
    console.log("id: "+ req.body.id)
    console.log("descripcion: "+ req.body.descripcion)
    console.log("fecha: "+ req.body.fecha)
    console.log("repetir: "+ req.body.repetir)
    console.log("fechaoriginal: "+ req.body.fechaoriginal)
    console.log("idusuario: "+ req.body.idusuario)


    const id = req.body.id;
    const descripcion = req.body.descripcion
    const fecha = req.body.fecha;
    const repetir = req.body.repetir
    const fechaoriginal = req.body.fechaoriginal
    const idusuario = req.body.idusuario

    console.log(id)
    const queryString = `UPDATE money_control.alerta
                        SET
                        descripcion = ?,
                        fecha = ?,
                        repetir = ?,
                        fechaoriginal = ?,
                        idusuario = ?
                        WHERE id =?
                        `
    connection.query(queryString, [descripcion, fecha, repetir, fechaoriginal, idusuario, id ], (err, results, fields) =>{
        if (err){
            console.log("Error al editar la alerta: "+ err)
            res.sendStatus(400)
            return
        }
        console.log("Se editó la alerta: ", results.affectedRows);
        res.end()
    } )
});

Router.delete('/delete/:id', (req, res) => {
    const connection = req.app.get('connection');

    console.log("Eliminar la alerta con id: "+ req.params.id)

    const id = req.params.id
    const queryString = "delete from alerta where id =?"
    connection.query(queryString, [id],(err, rows, fields) => {
        if(err){
            console.log("No existe la alerta " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Alerta Eliminada")
        res.json(rows)
    })
});

module.exports = Router;