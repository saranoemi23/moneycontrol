const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todas las transacciones")

    const queryString = `select t.id, t.tipo, t.fecha, t.monto, 
                            c.descripcion as categoria, 
                            t.descripcion from transaccion t
                            inner join categoria c on t.id_categoria = c.id`

    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay transacciones " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Transacciones Seleccionadas")
        res.json(rows)
    })
});

//Transaccion x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar transaccion con id: "+ req.params.id)

    const ID= req.params.id
    const queryString = "select * from transaccion where id = ?"
    connection.query(queryString, [ID],(err, rows, fields) => {
        if(err){
            console.log("No existe una transaccion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Transaccion Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar transaccion..")
    console.log("tipo: "+ req.body.tipo)
    console.log("fecha: "+ req.body.fecha)
    console.log("descripcion: "+ req.body.descripcion)
    console.log("monto: "+ req.body.monto)
    console.log("id_categoria: "+ req.body.id_categoria)
   
    const tipo = req.body.tipo
    const fecha = req.body.fecha
    const descripcion = req.body.descripcion
    const monto = req.body.monto
    const id_categoria = req.body.id_categoria
    const id_usuario = 1; // TODO: implementar usuarios

    const queryString = `insert into transaccion  (tipo, fecha, descripcion, 
                            monto, id_categoria, id_usuario)  values  (?,?,?,?,?,?)`
    connection.query(queryString, [tipo, fecha, descripcion, monto, id_categoria, id_usuario], (err, results, fields) =>{
        if (err){
            console.log("Error al agregar la transaccion: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego transaccion con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de agregar transaccion..")
    console.log("tipo: "+ req.body.tipo)
    console.log("fecha: "+ req.body.fecha)
    console.log("descripcion: "+ req.body.descripcion)
    console.log("monto: "+ req.body.monto)
    console.log("id_categoria: "+ req.body.id_categoria)
   
    const id = req.body.id
    const tipo = req.body.transaccion
    const fecha = req.body.fecha
    const descripcion = req.body.descripcion
    const monto = req.body.monto
    const id_categoria = req.body.id_categoria
    const id_usuario = '';

    console.log(id)
    const queryString = `update transaccion set tipo = ?, fecha = ?, descripcion = ?, 
                            monto = ?, id_categoria = ?, id_usuario = ? where id = ?`
    connection.query(queryString, [tipo, fecha, descripcion, monto, id_categoria, id_usuario, id], (err, results, fields) =>{
        if (err){
            console.log("Error al editar la transaccion: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito la transaccion con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar transaccion con id: "+ req.params.id)

    const id = req.params.id
    const queryString = "delete from transaccion where id =?"
    connection.query(queryString, [id],(err, rows, fields) => {
        if(err){
            console.log("No existe transaccion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Transaccion Eliminada")
        res.json(rows)
    })
});

module.exports = Router;