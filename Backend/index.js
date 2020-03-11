const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

//Rutas
const TransaccionesRoutes = require("./routes/routes.transacciones");
const CategoriasRoutes = require("./routes/routes.categorias");

var app = express();

app.use(bodyParser.json());
app.use(cors());

//Usar rutas
app.use("/transacciones", TransaccionesRoutes);
app.use("/categorias", CategoriasRoutes);

app.listen(3000, () =>{
    console.log('Server on port 3000');
});
