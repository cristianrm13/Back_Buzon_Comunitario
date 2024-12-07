import { Request, Response } from 'express';
import Usuario, { IUsuario } from '../../domain/models/usuario';

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
        const usuario = await Usuario.findById(_id);

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const usuarioResponse = {
            ...usuario.toObject(),
            contrasena: usuario.contrasena,
        };

        res.status(200).send(usuarioResponse);
    } catch (error) {
        res.status(500).send(error);
    }
};