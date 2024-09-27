const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost:',      // Cambia esto si tu servidor no está en local
  user: 'root',           // Tu nombre de usuario en MySQL
  port: '3306',
  password: 'Alejandro134456QW_',   // Tu contraseña de MySQL
  database: 'rgcomputadores'  // El nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

module.exports = connection;
