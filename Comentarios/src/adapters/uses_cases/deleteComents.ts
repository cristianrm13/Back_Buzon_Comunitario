import { Request, Response } from 'express';
import Comentario from '../../domain/models/comentarios';

export const eliminarComentario = async (req: Request, res: Response) => {
    try {
        const { comentarioId } = req.params;

        const comentario = await Comentario.findByIdAndDelete(comentarioId);
        if (!comentario) {
            return res.status(404).send({ error: 'Comentario no encontrado.' });
        }

        res.status(200).send({ message: 'Comentario eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).send({ error: 'Error al eliminar el comentario.' });
    }
};