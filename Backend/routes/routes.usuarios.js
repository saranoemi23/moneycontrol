const express = require("express");
const Router = express.Router();

Router.post('/login', (req, res) => {
  const connection = req.app.get('connection');

  console.log("usuario: "+ req.body.user)

  const user = req.body.user;
  const pass = req.body.pass;
  const redirect = req.body.redirect;

  const queryString = `select id, username from usuario
    where username = ?
    and password = ?`

  connection.query(queryString, [user, pass], (err, rows) => {
    if(err){
      console.log("Usuario no encontrado " + err)
      res.sendStatus(500)
      res.end()
      return;
    }

    if (rows.length > 0) {
      console.log("Usuario Encontrado");

      let usuario = rows[0];
      req.session.userId = usuario.id + '';
    }
    res.redirect(redirect);

  });
});

Router.get('/session', (req, res) => {

  let userId = req.session.userId;
  let userName = req.session.userName;

  if (!userId) {
    return res.json({});
  }

  res.json({
    userId: userId,
    userName: userName
  });

});

module.exports = Router;