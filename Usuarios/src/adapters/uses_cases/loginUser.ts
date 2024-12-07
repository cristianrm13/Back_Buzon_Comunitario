import { Request, Response } from 'express';
import Usuario, { IUsuario } from '../../domain/models/usuario';
import { logAudit } from '../../../../Auditorias/src/services/auditService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { escape } from 'lodash';

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { correo, contrasena } = req.body;
        const usuario = await Usuario.findOne({ correo: escape(req.body.correo) });

        if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena))) {
            return res.status(401).send({ error: 'Credenciales no válidas.' });
        }
        const token = jwt.sign(
            { _id: usuario._id, role: usuario.role },
            process.env.JWT_SECRET || 'holatutu'
        );

        // Registrar auditoría al logearse
        await logAudit(usuario._id.toString(), 'login', `Usuario inició sesión: ${correo}`);

        res.send({ usuario, token, role: usuario.role });
    } catch (error) {
        res.status(400).send(error);
    }
};