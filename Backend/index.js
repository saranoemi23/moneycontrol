const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { connection, options } = require('./conection');
const session = require('./session');

const app = express();

app.use(session(options));
app.set('connection', connection);
app.set('trustproxy', true);

//Rutas
const UsuariosRoutes = require('./routes/routes.usuarios');
const TransaccionesRoutes = require('./routes/routes.transacciones');
const CategoriasRoutes = require('./routes/routes.categorias');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({
    "origin": [
        'http://localhost:4200',
        'http://localhost:3000',
        'http://54.196.252.204:4200',
        'http://54.196.252.204:3000',
    ],
    "credentials": true,
}))

//Usar rutas
app.use('/usuarios', UsuariosRoutes);
app.use('/transacciones', TransaccionesRoutes);
app.use('/categorias', CategoriasRoutes);

app.listen(3000, () =>{
    console.log('Server on port 3000');
});
