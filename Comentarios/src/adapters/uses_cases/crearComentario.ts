import { Request, Response } from 'express';
import Comentario from '../../domain/models/comentarios';
import Queja from '../../../../Quejas/src/domain/models/quejas';

export const crearComentarioService = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const userId = (req as any).userId;
        const { quejaId } = req.params;

        // Verificar que la queja exista
        const queja = await Queja.findByPk(quejaId);
        if (!queja) {
            return res.status(404).send({ error: 'Queja no encontrada.' });
        }

        const comentario = new Comentario({ content, userId, quejaId });
        await comentario.save();

        res.status(201).send(comentario);
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).send({ error: 'Error al agregar el comentario.' });
    }
};