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

    const tipo = req.query.tipo;

    let filtroTipo = '';

    if (tipo == 'S') {
        filtroTipo = "and t.tipo = 'S' ";
    } else
    if (tipo == 'E') {
        filtroTipo = "and t.tipo = 'E' ";
    }

    console.log("Seleccionar todas las transacciones");

    const queryString = `select t.id, t.tipo, t.fecha, t.monto,
                            c.descripcion as categoria,
                            t.descripcion from transaccion t
                            inner join categoria c on t.id_categoria = c.id
                            where id_usuario = ?
                            ${filtroTipo}`;

    console.log('usuario', usuario);


    connection.query(queryString, [usuario], (err, rows, fields) => {
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

Router.get('/total', (req, res) => {
    const connection = req.app.get('connection');
    const usuario = req.session.userId;

    console.log("Seleccionar todas las transacciones");

    const queryString = `select 	
                                sum(case when t.tipo = 'E' then t.monto else 0 end) as entradas,
                                sum(case when t.tipo = 'S' then t.monto else 0 end) as salidas
                        from 	transaccion t
                         inner join categoria c on t.id_categoria = c.id
                        where 	id_usuario = ?;
                            `;

    console.log('usuario', usuario);


    connection.query(queryString, [usuario], (err, rows, fields) => {
        if(err){
            console.log("No hay transacciones " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Transacciones Seleccionadas")
        res.json(rows[0])
    })
});

//Transaccion x ID
Router.get('/get/:id', (req, res) => {
    const connection = req.app.get('connection');

    console.log("Seleccionar transaccion con id: "+ req.params.id)

    const ID= req.params.id
    const queryString = `select 	id, tipo, DATE_FORMAT(fecha, "%Y-%m-%d") as fecha, 
                                    descripcion, monto, id_usuario, id_categoria
                        from 	    transaccion where id = ?;`
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
    const connection = req.app.get('connection');

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
    const id_usuario = req.session.userId;

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

Router.post('/edit/:id', (req, res) =>{
    const connection = req.app.get('connection');

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
    const id_usuario = req.session.userId;

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
    const connection = req.app.get('connection');

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