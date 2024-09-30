const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./config/routes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas definidas
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
