import { Request, Response } from 'express';
import Usuario, { IUsuario } from '../../domain/models/usuario';

export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find({});
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
};