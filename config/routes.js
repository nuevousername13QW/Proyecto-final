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


router.post('/RegistroEntrada', (req, res) => {
    const { documento_vigilante, id_compu_carnet } = req.body;

    // Validación de campos
    if (!documento_vigilante || !id_compu_carnet) {
        return res.status(400).json({ mensaje: 'Faltan datos requeridos.' });
    }

    // Comprobación de que el documento del vigilante existe
    const checkVigilanteQuery = `
        SELECT * FROM vigilantes WHERE documento_vigilante = ?
    `;
    connection.query(checkVigilanteQuery, [documento_vigilante], (err, results) => {
        if (err) {
            console.error('Error al verificar vigilante:', err);
            return res.status(500).json({ mensaje: 'Error al verificar vigilante.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Vigilante no encontrado.' });
        }

        // Comprobación de si el registro ya existe
        const checkRegistroQuery = `
            SELECT * FROM registros WHERE documento_vigi = ? AND id_compu_carnet = ?
        `;
        connection.query(checkRegistroQuery, [documento_vigilante, id_compu_carnet], (err, registroResults) => {
            if (err) {
                console.error('Error al verificar registro:', err);
                return res.status(500).json({ mensaje: 'Error al verificar registro.' });
            }

            // Verificar si ya está registrado como 'dentro'
            if (registroResults.length > 0) {
                const registro = registroResults[0]; // Obtener el registro encontrado
                if (registro.estado === 'dentro') {
                    return res.status(400).json({ mensaje: 'La persona ya está dentro. Debe registrar su salida antes de ingresar de nuevo.' });
                }

                // Si no está dentro, actualizar el estado a 'dentro'
                const updateRegistroQuery = `
                    UPDATE registros 
                    SET estado = 'dentro' 
                    WHERE documento_vigi = ? AND id_compu_carnet = ?
                `;
                connection.query(updateRegistroQuery, [documento_vigilante, id_compu_carnet], (err) => {
                    if (err) {
                        console.error('Error al actualizar registro:', err);
                        return res.status(500).json({ mensaje: 'Error al actualizar registro.' });
                    }
                    // Respuesta exitosa
                    return res.status(200).json({ mensaje: 'Registro actualizado a "dentro" exitosamente.' });
                });
            } else {
                // Si no existe, insertar nuevo registro
                const insertRegistroQuery = `
                    INSERT INTO registros (documento_vigi, id_compu_carnet, estado)
                    VALUES (?, ?, 'dentro')
                `;
                connection.query(insertRegistroQuery, [documento_vigilante, id_compu_carnet], (err, results) => {
                    if (err) {
                        console.error('Error al crear registro:', err);
                        return res.status(500).json({ mensaje: 'Error al crear registro.' });
                    }
                    // Respuesta exitosa
                    return res.status(201).json({ mensaje: 'Registro creado exitosamente.', id_registro: results.insertId });
                });
            }
        });
    });
});




router.post('/registroSalida', (req, res) => {
    const { documento_vigilante, id_compu_carnet } = req.body;

    // Validación de campos
    if (!documento_vigilante || !id_compu_carnet) {
        return res.status(400).json({ mensaje: 'Faltan datos requeridos.' });
    }

    // Comprobación de que el documento del vigilante existe
    const checkVigilanteQuery = `
        SELECT * FROM vigilantes WHERE documento_vigilante = ?
    `;
    connection.query(checkVigilanteQuery, [documento_vigilante], (err, results) => {
        if (err) {
            console.error('Error al verificar vigilante:', err);
            return res.status(500).json({ mensaje: 'Error al verificar vigilante.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Vigilante no encontrado.' });
        }

        // Comprobación de que la persona esté registrada como "dentro"
        const checkRegistroQuery = `
            SELECT * FROM registros WHERE id_compu_carnet = ? AND estado = 'dentro'
        `;
        connection.query(checkRegistroQuery, [id_compu_carnet], (err, registros) => {
            if (err) {
                console.error('Error al verificar registro:', err);
                return res.status(500).json({ mensaje: 'Error al verificar registro.' });
            }

            if (registros.length === 0) {
                // Si no hay un registro activo como "dentro", no se puede registrar la salida
                return res.status(400).json({ mensaje: 'No se puede registrar la salida. La persona no se registró en la entrada.' });
            }

            // Actualización del registro para marcarlo como "fuera"
            const updateRegistroQuery = `
                UPDATE registros SET estado = 'fuera' WHERE id_compu_carnet = ? AND estado = 'dentro'
            `;
            connection.query(updateRegistroQuery, [id_compu_carnet], (err, results) => {
                if (err) {
                    console.error('Error al actualizar registro:', err);
                    return res.status(500).json({ mensaje: 'Error al registrar salida.' });
                }

                // Respuesta exitosa
                return res.status(200).json({ mensaje: 'Salida registrada exitosamente.' });
            });
        });
    });
});

router.post('/obtener-idcomputador-carnet', (req, res) => {
    const { documento_identidad, serial } = req.body;
    console.log('Datos recibidos:', { documento_identidad, serial });

    if (!documento_identidad || !serial) {
        return res.status(400).send({ error: 'Documento de identidad y serial son requeridos' });
    }

    const query = `
        SELECT cc.idcomputador_carnet
        FROM usuarios u
        JOIN carnet ca ON u.documento_identidad = ca.codigo_barras
        JOIN computador_carnet cc ON ca.id_carnet = cc.id_carnet
        JOIN computadores comp ON cc.serial_compu = comp.serial
        WHERE u.documento_identidad = ? AND comp.serial = ?
    `;
    
    connection.query(query, [documento_identidad, serial], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).send({ error: 'Error al obtener el ID' });
        }

        if (results.length > 0) {
            res.send({ idcomputador_carnet: results[0].idcomputador_carnet });
        } else {
            res.status(404).send({ error: 'ID no encontrado' });
        }
    });
});

module.exports = router;