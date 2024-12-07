import express from 'express';
import  whatsappRoutes from './whatsappRoutes';
import mercadoPagoRoutes from './mercadoPagoRoutes';
import usuariosRoutes from './usuariosRoutes';
import quejasRoutes from '../../../../Quejas/src/adapters/routes/quejaRoutes';
import comentariosRoutes from '../../../../Comentarios/src/adapters/routes/comentariosRoutes';
//import auditRoutes from './auditRoutes';

const router = express.Router();

const apiVersion = '/v1';


router.use(`${apiVersion}/whatsapp`, whatsappRoutes);
router.use(`${apiVersion}/mercadopago`, mercadoPagoRoutes);
router.use(`${apiVersion}/usuarios`, usuariosRoutes);
router.use(`${apiVersion}/quejas`, quejasRoutes);
router.use(`${apiVersion}/comentarios`, comentariosRoutes);
//router.use('/audit', auditRoutes);

export default router;
