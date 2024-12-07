import { Request, Response } from 'express';
import Usuario, { IUsuario } from '../../domain/models/usuario';
import { logAudit } from '../../../../Auditorias/src/services/auditService';

export const eliminarUsuario = async (req: Request, res: Response) => {
    // Verificación de permisos: solo un admin puede eliminar usuarios
    if (req.params.role !== 'admin') {
        return res.status(403).send({ error: 'No tienes permiso para realizar esta acción.' });
    }
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send();
        }
        // Registrar auditoría al eliminar usuario
        await logAudit(usuario._id.toString(), 'delete', `Usuario eliminado: ${usuario.correo}`);

        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
};