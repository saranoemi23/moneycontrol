const Path = require('path') //modulo nativo de js para manipular las carpetas

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
const AlertasRoutes = require('./routes/routes.alertas');
const CuentasRoutes = require('./routes/routes.cuentas');
const SuscripcionesRoutes = require('./routes/routes.suscripciones');

let frontend = Path.join(__dirname,"../Frontend/dist/MoneyControlApp"); //ruta de los archivos que compile angular
console.log(frontend);

if (process.env.NODE_ENV == 'production'){
    app.use(express.static(frontend));
}

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
app.use('/api/usuarios', UsuariosRoutes);
app.use('/api/transacciones', TransaccionesRoutes);
app.use('/api/categorias', CategoriasRoutes);
app.use('/api/alertas', AlertasRoutes);
app.use('/api/cuentas', CuentasRoutes);
app.use('/api/suscripciones', SuscripcionesRoutes);


if (process.env.NODE_ENV == 'production'){
    //si la ruta actual no esta configurada, se ejecuta por default ésta 
    app.get("/*", function(req, res){
        res.sendFile(frontend+"/index.html")
    });
}


app.listen(3000, () =>{
    console.log("env", process.env.NODE_ENV);
    console.log('Server on port 3000');
});
