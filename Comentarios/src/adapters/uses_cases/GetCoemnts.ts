import { Request, Response } from 'express';
import Comentario from '../../domain/models/comentarios';

export const obtenerComentariosPorQueja = async (req: Request, res: Response) => {
    try {
        const { quejaId } = req.params;
        //const queja = await Queja.findById(quejaId).populate('comentarios');
        const comentarios = await Comentario.find({ quejaId }).populate('userId', 'nombre correo');
        res.status(200).send(comentarios);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).send({ error: 'Error al obtener los comentarios.' });
    }
};