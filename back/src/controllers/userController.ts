import { Request, Response } from 'express';
import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import auth from '../config/auth';

const userSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    gender: true,
    phoneNumber: true,
    dateBirth: true,
    memberSince: true,
    emailNotification: true,
    smsNotification: true,
    marketingEmail: true,
    orderUpdate: true,
    newArrival: true,
    saleAlert: true,
}

export class UserController {

    public static async create(req: Request, res: Response) {
        try {
            const {
                firstName, lastName, email, password, gender, phoneNumber, dateBirth,
                emailNotification, smsNotification, marketingEmail, orderUpdate, newArrival, saleAlert
            } = req.body;

            const { salt, hash } = auth.generatePassword(password);

            const createData: Prisma.UserCreateInput = {
                firstName, lastName, email, hash, salt, gender, phoneNumber,
                dateBirth: dateBirth ? new Date(dateBirth) : null,
                ...(emailNotification !== undefined && { emailNotification }),
                ...(smsNotification !== undefined && { smsNotification }),
                ...(marketingEmail !== undefined && { marketingEmail }),
                ...(orderUpdate !== undefined && { orderUpdate }),
                ...(newArrival !== undefined && { newArrival }),
                ...(saleAlert !== undefined && { saleAlert }),
            };

            const user = await prisma.user.create({ data: createData });

            return res.status(201).json({ message: "Usuário criado com sucesso", id: user.id });
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async login(req: Request, res: Response) {
        try {
            const { password, email } = req.body;

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            if (auth.checkPassword(password, user.hash, user.salt)) {
                const token = auth.generateJWT(user.id);
                return res.status(200).json({ token: token });
            } else {
                return res.status(401).json({ message: "Senha ou email incorretos" });
            }
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async getUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({ select: userSelect });
            return res.status(200).json(users);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                select: userSelect
            });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            return res.status(200).json(user);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { firstName, lastName, email, password, gender, phoneNumber, dateBirth } = req.body;

            let updateData: Prisma.UserUpdateInput = {
                firstName,
                lastName,
                email,
                gender,
                phoneNumber,
                ...(dateBirth !== undefined && { dateBirth: new Date(dateBirth) })
            };

            if (password) {
                const { salt, hash } = auth.generatePassword(password);
                updateData.hash = hash;
                updateData.salt = salt;
            }

            const updatedUser = await prisma.user.update({
                data: updateData,
                where: { id: Number(id) },
                select: userSelect
            });

            return res.status(200).json(updatedUser);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async updatePreferences(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { emailNotification, smsNotification, marketingEmail, orderUpdate, newArrival, saleAlert } = req.body;

            const updatedPreferences = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    emailNotification,
                    smsNotification,
                    marketingEmail,
                    orderUpdate,
                    newArrival,
                    saleAlert
                },
                select: userSelect
            });

            return res.status(200).json(updatedPreferences);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.user.delete({ where: { id: Number(id) } });
            return res.status(204).send();
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }
}