import { Router, Request, Response } from "express";
import { usuarios } from "../data/data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import { User, UserModel } from "../models/usuarios.model";
import bcrypt from "bcryptjs";

const router = Router();

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        roles: string[];
    }
}

router.get("/load", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if (userCount > 0) {
            res.send("DATOS CARGADO ANTERIORMENTE ");
            return;
        }
        await UserModel.create(usuarios);
        res.send("SE CARGO LOS USUARIOS CON EXITO")
    }))

//verificar usuarios login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Credenciales incorrecta vuelvlo a intentar");
    }
}))

//registrar usuarios
router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { name, email, password, roles } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(400).send("Usuario ya existe, desea logearse");
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: "",
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            roles: [],
            token: "",
        };

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    })
);


// Obtener todos los usuarios
router.get(
    "/users",
    asyncHandler(async (req: Request, res: Response) => {
        const users = await UserModel.find();
        res.send(users);
    })
);

// Obtener un usuario por su ID
router.get(
    "/users/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(400).send("Usuario no encontrado");
        }
    })
);


// Actualizar un usuario existente
router.put(
    "/users/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const { name, email } = req.body;
        const user = await UserModel.findById(req.params.id);

        if (user) {
            user.name = name;
            user.email = email.toLowerCase();

            await user.save();
            res.send(user);
        } else {
            res.status(400).send("Usuario no encontrado");
        }
    })
);

// Eliminar un usuario
router.delete(
    "/users/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findById(req.params.id);

        if (user) {
            await UserModel.deleteOne({ _id: user._id });
            res.send("Usuario eliminado exitosamente");
        } else {
            res.status(400).send("Usuario no encontrado");
        }
    })
);

//validaciones de tokes y usuarios
const generateTokenResponse = (user: User) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d",
        }
    );
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        token: token,
    };
};


export default router