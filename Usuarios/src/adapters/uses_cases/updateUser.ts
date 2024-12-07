import { Request, Response } from 'express';
import Usuario, { IUsuario } from '../../domain/models/usuario';
import { logAudit } from '../../../../Auditorias/src/services/auditService';
import bcrypt from 'bcrypt';

export const actualizarUsuario = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body) as Array<keyof IUsuario>;
    const allowedUpdates: Array<keyof IUsuario> = ['nombre', 'correo', 'contrasena', 'telefono'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }

    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        updates.forEach((update) => {
            if (update === 'contrasena' && req.body.contrasena !== usuario.contrasena) {
                usuario.contrasena = bcrypt.hashSync(req.body.contrasena, 10); // Encripta solo si es nueva
            } else {
                (usuario as any)[update] = req.body[update];
            }
        });

        await usuario.save();

        // Registrar auditoría al actualizar un usuario
        await logAudit(usuario._id.toString(), 'update', `Usuario actualizado: ${usuario.correo}`);

        res.status(200).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
};