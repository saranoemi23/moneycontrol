const express = require("express");
const Router = express.Router();

Router.post('/add', (req, res) =>{
  const connection = req.app.get('connection');

  console.log("Tratando de agregar suscripcion..")
  console.log("titular: "+ req.body.titular)
  console.log("mes: "+ req.body.mes)
  console.log("ano: "+ req.body.ano)
  console.log("ciudad: "+ req.body.ciudad)
  console.log("direccion: "+ req.body.direccion)
  console.log("idusuario: "+ req.body.idusuario)
  console.log("fechainicial: "+ req.body.fechainicial)
  console.log("fecharenovacion: "+ req.body.fecharenovacion)
  console.log("token: "+ req.body.token)

  const titular = req.body.titular
  const mes = req.body.mes
  const ano = req.body.ano
  const ciudad = req.body.ciudad
  const direccion = req.body.direccion
  const idusuario = req.body.idusuario
  const tarjeta = req.body.tarjeta
  const ccv = req.body.ccv
  const token = generartoken(tarjeta,ccv,ano,mes)

  const queryString = `INSERT INTO money_control.suscripcion
                        (titular, mes, ano, ciudad, direccion, idusuario, fechainicial, fecharenovacion, token)
                        VALUES (?,?,?,?,?,?,curdate(),curdate(),?);
                        `
  connection.query(queryString, [titular, mes, ano, ciudad, direccion, idusuario, token], (err, results, fields) =>{
      if (err){
          console.log("Error al agregar la suscripcion: "+ err)
          res.sendStatus(500)
          return
      }
      console.log("Se agrego suscripcion con id: ", results.insertId);
      res.end()
  } )
});

  function generartoken(tarjeta,ccv,ano,mes){
    return 'faketoken' 
    // + JSON.stringify({ tarjeta,ccv,ano,mes })
  }


module.exports = Router;