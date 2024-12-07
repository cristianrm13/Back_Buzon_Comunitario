// types/express.d.ts
import { IUsuario } from '../API_microservicios/src/domain/models/usuario'; // Ajusta la ruta si es necesario

declare global {
    namespace Express {
        interface Request {
            user: IUsuario; // Aquí especificas el tipo de 'user' que se debe agregar
        }
    }
}
