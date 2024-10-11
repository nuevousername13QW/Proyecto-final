const express = require('express');
const router = express.Router();
const connection = require('./db');

router.post('/insertar', (req, res) => {
    const { documento_identidad, Nomb_completo, tipo_usuar, marca, serial, color, cargador, mouse } = req.body;

    // Ingresar datos a la tabla usuarios
    const queryUsuario = 'INSERT INTO usuarios (documento_identidad, Nomb_completo, tipo_usuar) VALUES (?, ?, ?)';
    connection.query(queryUsuario, [documento_identidad, Nomb_completo, tipo_usuar], (err) => {
        if (err) {
            console.error('Error al insertar en usuarios:', err);
            return res.status(500).json({ error: 'Error en la inserción de usuarios' });
        }

        // Ingresar datos en la tabla carnet con el documento del usuario
        const queryCarnet = 'INSERT INTO carnet (codigo_barras) VALUES (?)';
        connection.query(queryCarnet, [documento_identidad], (err, results) => {
            if (err) {
                console.error('Error al insertar en carnet:', err);
                return res.status(500).json({ error: 'Error en la inserción de carnet' });
            }

            // Obtener el id del carnet insertado
            const carnetInsertedId = results.insertId;

            // Ingresar datos a la tabla computadores
            const queryComputador = 'INSERT INTO computadores (marca, serial, color, cargador, mouse) VALUES (?, ?, ?, ?, ?)';
            connection.query(queryComputador, [marca, serial, color, cargador, mouse], (err) => {
                if (err) {
                    console.error('Error al insertar en computadores:', err);
                    return res.status(500).json({ error: 'Error en la inserción de computadores' });
                }

                // Ingresar datos en la tabla computador_carnet con el serial del computador y el id del carnet
                const queryComputadorCarnet = 'INSERT INTO computador_carnet (serial_compu, id_carnet) VALUES (?, ?)';
                connection.query(queryComputadorCarnet, [serial, carnetInsertedId], (err) => {
                    if (err) {
                        console.error('Error al insertar en computador_carnet:', err);
                        return res.status(500).json({ error: 'Error en la inserción de computador_carnet' });
                    }

                    res.status(200).json({ message: 'Datos insertados correctamente en todas las tablas' });
                });
            });
        });
    });
});

router.post('/insertarVigilante', (req, res) => {
    const { documento_vigilante, nombre } = req.body;
    const queryVigilantes = 'INSERT INTO vigilantes (documento_vigilante, nombre) VALUES (?, ?)';

    connection.query(queryVigilantes, [documento_vigilante, nombre], (err, results) => {
        if (err) {
            console.error('Error al insertar en vigilantes:', err);
            return res.status(500).json({ error: 'Error en la inserción de vigilantes' });
        }
        res.status(200).json({ message: 'Datos insertados de manera exitosa', vigilanteId: results.insertId });
    });
});

// echale ojo con esto que debe estar malo pai
router.get('/obtenerDatos/:documento_identidad', (req, res) => {
    const documento_identidad = req.params.documento_identidad;
    const query = `SELECT u.*, ca.*, comp.*
                   FROM usuarios u
                   JOIN carnet ca ON u.documento_identidad = ca.codigo_barras
                   JOIN computador_carnet cc ON ca.id_carnet = cc.id_carnet
                   JOIN computadores comp ON cc.serial_compu = comp.serial
                   WHERE u.documento_identidad = ?`;

    connection.query(query, [documento_identidad], (err, results) => {
        // Primero se maneja el error
        if (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res.status(500).json({ error: 'Error en la consulta de datos' });
        }

        // Ahora se manejan los resultados
        if (results.length > 0) {
            const resultado = {
                computador: {
                    serial: results[0].serial,
                    marca: results[0].marca,
                    color: results[0].color,
                    cargador: results[0].cargador,
                    mouse: results[0].mouse
                }
            };
            return res.status(200).json(resultado); // Enviar los datos estructurados
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    });
});



module.exports = router;