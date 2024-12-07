import { Request, Response } from 'express';
import { crearUsuario } from '../uses_cases/crearUsuario';
import { obtenerUsuarios } from '../uses_cases/getUsers';
import { obtenerUsuarioPorId } from '../uses_cases/getUserById';
import { actualizarUsuario } from '../uses_cases/updateUser';
import { eliminarUsuario } from '../uses_cases/deleteUser';
import { loginUsuario } from '../uses_cases/loginUser';

export class UserController {
    constructor() { }

    crearUsuarios = (req: Request, res: Response) => crearUsuario(req, res);
    obtenerUsuarioss = (req: Request, res: Response) => obtenerUsuarios(req, res);
    obtenerUsuarioPorIds = (req: Request, res: Response) => obtenerUsuarioPorId(req, res);
    actualizarUsuarios = (req: Request, res: Response) => actualizarUsuario(req, res);
    eliminarUsuarios = (req: Request, res: Response) => eliminarUsuario(req, res);
    loginUsuario = (req: Request, res: Response) => loginUsuario(req, res);
}