const express = require("express");
const Router = express.Router();

Router.use(function (req, res, next) {
    const usuario = req.session.userId;
    if (!usuario) {
        res.sendStatus(403);
        return res.end();
    }
    next();
})

Router.get('/get', (req, res) => {
    const connection = req.app.get('connection');
    const usuario = req.session.userId;

    console.log("Seleccionar todas las cuentas")

    const queryString = `SELECT id, 
                                nombre, 
                                tipocuenta, 
                                saldoinicial, 
                                principal 
                        FROM    money_control.cuenta 
                        WHERE   idusuario = ? `

    connection.query(queryString,[usuario],(err, rows, fields) => {
        if(err){
            console.log("No hay cuentas por usuario" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Cuentas por usuario seleccionadas")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{
    const connection = req.app.get('connection');
    const usuario = req.session.userId;

    console.log("Tratando de agregar cuentas por usuario..")
    console.log("nombre: "+ req.body.nombre)
    console.log("tipocuenta: "+ req.body.tipocuenta)
    console.log("saldoinicial: "+ req.body.saldoinicial)
    console.log("idusuario: "+ req.session.userId)
    console.log("principal:" + req.body.principal)

    const nombre = req.body.nombre;
    const tipocuenta = req.session.tipocuenta;
    const saldoinicial = req.body.saldoinicial;
    const principal = req.body.principal;

    const queryString = `INSERT INTO money_control.cuenta
                        (nombre, tipocuenta, saldoinicial, idusuario, principal)
                        VALUES
                        (?,?,?,?,?);
                        `
    connection.query(queryString, [nombre, tipocuenta, saldoinicial, usuario, principal], (err, results, fields) =>{
        if (err){
            console.log("Error al agregar la cuentas: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego cuenta con id: ", results.insertId);
        res.end()

    } )
});

Router.post('/edit/:id', (req, res) =>{
    const connection = req.app.get('connection');

    console.log("Tratando de agregar cuentas por usuario..")
    console.log("id: "+ req.body.id)
    console.log("nombre: "+ req.body.nombre)
    console.log("tipocuenta: "+ req.body.tipocuenta)
    console.log("saldoinicial: "+ req.body.saldoinicial)
    console.log("idusuario: "+ req.session.userId)
    console.log("principal:" + req.body.principal)


    const id = req.body.id;
    const nombre = req.body.nombre;
    const tipocuenta = req.body.tipocuenta;
    const saldoinicial = req.body.saldoinicial;
    const idusuario = req.session.userId;
    const principal = req.body.principal;

    console.log(id)
    const queryString = `UPDATE money_control.cuenta
                        SET nombre = ?, tipocuenta =? , saldoinicial = ?, idusuario = ?, principal = ?
                        WHERE id =?
                        `
    connection.query(queryString, [nombre, tipocuenta, saldoinicial, idusuario, principal, id ], (err, results, fields) =>{
        if (err){
            console.log("Error al editar la cuenta: "+ err)
            res.sendStatus(400)
            return
        }
        console.log("Se editó la cuenta: ", results.affectedRows);
        res.end()
    } )
});

Router.delete('/delete/:id', (req, res) => {
    const connection = req.app.get('connection');

    console.log("Eliminar la alerta con id: "+ req.params.id)

    const id = req.params.id
    const queryString = "delete from money_control.cuenta where id =?"
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