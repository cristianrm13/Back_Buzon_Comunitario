import { Router } from 'express';
import { ComentarioController } from '../controllers/comentariosController';
import { authMiddleware } from '../../../../Usuarios/src/adapters/middlewares/authMiddleware';
import { cleanInput } from '../../../../Usuarios/src/adapters/middlewares/cleanInput';

const router = Router();
const comentarioController = new ComentarioController();

router.post('/:quejaId', authMiddleware, cleanInput, comentarioController.crearComentarios);
router.get('/:quejaId', comentarioController.obtenerComentarios);
router.delete('/:comentarioId', authMiddleware, comentarioController.eliminarComentarios);

export default router;
