import { Request, Response } from 'express';
import Usuario, { IUsuario } from '../../domain/models/usuario';
import { logAudit } from '../../../../Auditorias/src/services/auditService';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { escape } from 'lodash';


export const crearUsuario = async (req: Request, res: Response) => {
        try {
            const { nombre, correo, contrasena, telefono, role = 'user' } = req.body;
            // Validación de datos requeridos
            if (!nombre || !correo || !contrasena || !telefono) {
                return res.status(400).send({ error: 'Faltan datos necesarios para el registro.' });
            }

            const correoExistente = await Usuario.findOne({ correo: escape(req.body.correo) });
            if (correoExistente) {
                console.log(`El correo ${correo} ya está registrado.`);
                return res.status(400).json({ error: 'El correo ya está en uso.' });
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const codigoVerificacion = crypto.randomBytes(3).toString('hex');
            console.log(`Código de verificación generado: ${codigoVerificacion}`);

            const usuario = new Usuario({
                nombre,
                correo,
                contrasena: hashedPassword,
                telefono,
                codigoVerificacion,
                role,
            });
            await usuario.save();
            console.log(`Usuario ${nombre} guardado en la base de datos.`);

            // Registrar auditoría
            await logAudit(usuario._id.toString(), 'create', `Usuario creado: ${nombre}`);

            const token = jwt.sign(
                { _id: usuario._id, role: usuario.role },
                process.env.JWT_SECRET || 'holatutu'
            );
            console.log(`Token JWT generado: ${token}`);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rhgladbox@gmail.com',
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });

            const mailOptions = {
                from: 'rhgladbox@gmail.com',
                to: escape(correo),
                subject: '¡Bienvenido a GladBox!',
                text: `¡Hola ${escape(nombre)}!, tu código de verificación es: ${codigoVerificacion}`,
                html: `
                    <div style="text-align: center; font-family: Arial, sans-serif;">
                        <h1>¡Hola ${escape(nombre)}!</h1>
                        <p>Gracias por unirte a nuestra comunidad!. Ya puedes ingresar con tus datos a la APP:</p>
                        <div style="display: inline-block; padding: 10px; border: 2px solid #000; border-radius: 5px;">
                            /* <h2>${codigoVerificacion}</h2> */
                        </div>
                        <p>si no has sido tu el que se a registrado, comunicate con nosotros para ver los detalles a travez de rhgladbox@gmail.com</p>
                    </div>
                `,
            };

            const emailResponse = await transporter.sendMail(mailOptions);
            console.log('Correo enviado exitosamente:', emailResponse);

            res.status(201).send({ token, nombre: usuario.nombre, role: usuario.role });
        } catch (error) {
            console.error('Error en crearUsuario:', error);
            res.status(500).send({ error: 'Error al crear el usuario o enviar el correo.' });
        }
    };