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

Router.get('/getsegunusuario', (req, res) => {
    const connection = req.app.get('connection');
    const usuario = req.session.userId;

    console.log("Seleccionar todas las categorias")

    const queryString = `select     ca.id as ca_id, ca.descripcion as ca_descripcion,
                                    cp.id, cp.idcategoria, cp.idusuario, cp.presupuesto, cp.descripcion		
                        from        categoria_personalizada cp
                        right join  categoria ca on cp.idcategoria = ca.id
                        and         cp.idusuario = ?`;

    connection.query(queryString,[usuario],(err, rows, fields) => {
        if(err){
            console.log("No hay categorias por usuario" + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Categorias por usuario seleccionadas")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{
    const connection = req.app.get('connection');

    console.log("Tratando de agregar categoria por usuario..")
    console.log("idcategoria: "+ req.body.idcategoria)
    console.log("presupuesto: "+ req.body.presupuesto)
    console.log("descripcion: "+ req.body.descripcion)

    const idcategoria = req.body.idcategoria
    const idusuario = req.session.userId;
    const presupuesto = req.body.presupuesto
    const descripcion = req.body.descripcion

    const queryString = `insert into categoria_personalizada
                        (idcategoria,
                        idusuario,
                        presupuesto,
                        descripcion) values  (?,?,?,?)`
    connection.query(queryString, [idcategoria, idusuario, presupuesto, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error al agregar la transaccion: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego categoria con id: ", results.insertId);
        res.end()

    } )
});

Router.post('/edit/:id', (req, res) =>{
    const connection = req.app.get('connection');

    console.log("Tratando de agregar categoria por usuario..")
    console.log("id: "+ req.body.id)
    console.log("idcategoria: "+ req.body.idcategoria)
    console.log("presupuesto: "+ req.body.presupuesto)
    console.log("descripcion: "+ req.body.descripcion)

    const id = req.body.id;
    const idcategoria = req.body.idcategoria
    const idusuario = req.session.userId;
    const presupuesto = req.body.presupuesto
    const descripcion = req.body.descripcion

    console.log(id)
    const queryString = `UPDATE categoria_personalizada 
                        SET idcategoria = ?, idusuario = ?, presupuesto = ?, descripcion = ? 
                        WHERE id = ?;`
    connection.query(queryString, [idcategoria, idusuario, presupuesto, descripcion, id], (err, results, fields) =>{
        if (err){
            console.log("Error al editar la categoria: "+ err)
            res.sendStatus(400)
            return
        }
        console.log("Se editó la categoria: ", results.affectedRows);
        res.end()
    } )
});

Router.delete('/delete/:id', (req, res) => {
    const connection = req.app.get('connection');

    console.log("Eliminar la categoria con id: "+ req.params.id)

    const id = req.params.id
    const queryString = "delete from categoria_personalizada where id =?"
    connection.query(queryString, [id],(err, rows, fields) => {
        if(err){
            console.log("No existe la categoria " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Categoria Eliminada")
        res.json(rows)
    })
});

Router.get('/presupuesto/:idcategoria', (req, res) => {
    const connection = req.app.get('connection');

    console.log("Id categoría: "+ req.params.idcategoria)
    console.log("Id usuario: "+ req.session.userId)

    const idcategoria = req.params.idcategoria
    const idusuario = req.session.userId;

    const ID= req.params.id
    const queryString = `select idcategoria, ifnull(total, 0) as total, presupuesto 
                        from 	(
                                SELECT sum(monto) as total, id_categoria
                                FROM 	money_control.transaccion
                                where 	id_categoria = ?
                                and 	DATE_FORMAT(fecha, "%Y-%m") = DATE_FORMAT(curdate(), "%Y-%m")
                                and 	id_usuario = ?
                                group by id_categoria) as totales
                            right join
                                (SELECT 	idcategoria, presupuesto
                                FROM 	money_control.categoria_personalizada
                                where 	idcategoria = ?
                                and 	idusuario = ?) as presupuesto
                        on totales.id_categoria = presupuesto.idcategoria`
                        
    connection.query(queryString, [idcategoria, idusuario, idcategoria, idusuario],(err, rows, fields) => {
        if(err){
            console.log("No existe presupuesto " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Presupuesto Seleccionado")
        res.json(rows)
    })
});


module.exports = Router;