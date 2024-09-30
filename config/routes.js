const express = require('express');
const router = express.Router();
const connection = require('./db'); 

router.post('/insertar', (req, res) => {
    const { documento_identidad, Nomb_completo, tipo_usuar, marca, serial, color, cargador, mouse } = req.body;

    // Inserta datos en la tabla usuarios
    const queryUsuario = 'INSERT INTO usuarios (documento_identidad, Nomb_completo, tipo_usuar) VALUES (?, ?, ?)';
    const queryComputador = 'INSERT INTO computadores (marca, serial, color, cargador, mouse) VALUES (?, ?, ?, ?, ?)';

    connection.query(queryUsuario, [documento_identidad, Nomb_completo, tipo_usuar], (err, results) => {
        if (err) {
            console.error('Error al insertar en usuarios:', err);
            return res.status(500).json({ error: 'Error en la inserción de usuarios' });
        }

        // Inserta datos en la tabla computadores
        connection.query(queryComputador, [marca, serial, color, cargador, mouse], (err, results) => {
            if (err) {
                console.error('Error al insertar en computadores:', err);
                return res.status(500).json({ error: 'Error en la inserción de computadores' });
            }

            res.status(200).json({ message: 'Datos insertados correctamente', userId: results.insertId });
        });
    });
});

module.exports = router;

