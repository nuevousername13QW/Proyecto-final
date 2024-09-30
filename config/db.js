const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'root',          
  port: '3306',
  password: 'Alejandro134456QW_',   
  database: 'rgcomputadores'  
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
