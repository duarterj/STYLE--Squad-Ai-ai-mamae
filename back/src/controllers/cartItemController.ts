import { Request, Response } from 'express';
import { prisma } from "../config/prisma";

export class CartItemController {

    public static async addToCart(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { variantId, quantity } = req.body;

            if (quantity <= 0) {
                return res.status(400).json({ message: "A quantidade deve ser maior que zero." });
            }

            const userExist = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!userExist) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            const variantExist = await prisma.user.findUnique({ where: { id: Number(variantId) } });
            if (!userExist) {
                return res.status(404).json({ message: "Variante não encontrado." });
            }

            const existingCartItem = await prisma.cartItem.findUnique({
                where: {
                    userId_variantId: { userId: Number(id), variantId: Number(variantId) }
                }
            });

            if (existingCartItem) {
                const updatedItem = await prisma.cartItem.update({
                    where: {
                        userId_variantId: { userId: Number(id), variantId: Number(variantId) }
                    },
                    data: {
                        quantity: existingCartItem.quantity + quantity
                    }
                });
                return res.status(200).json({ message: "Quantidade atualizada no carrinho", cartItem: updatedItem });
            } else {
                const newItem = await prisma.cartItem.create({
                    data: {
                        userId: Number(id),
                        variantId: Number(variantId),
                        quantity: quantity
                    }
                });
                return res.status(201).json({ message: "Item adicionado ao carrinho", cartItem: newItem });
            }
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async getCart(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userExists = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!userExists) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const cart = await prisma.cartItem.findMany({
                where: { userId: Number(id) },
                include: {
                    variant: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            return res.status(200).json(cart);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async updateCartQuantity(req: Request, res: Response) {
        try {
            const { id, variantId } = req.params;
            const { quantity } = req.body;

            if (quantity <= 0) {
                return res.status(400).json({ message: "A quantidade deve ser maior que zero." });
            }

            const updatedItem = await prisma.cartItem.update({
                where: {
                    userId_variantId: { userId: Number(id), variantId: Number(variantId) }
                },
                data: { quantity }
            });

            return res.status(200).json({ message: "Quantidade alterada com sucesso", cartItem: updatedItem });
        } catch (e: any) {
            if (e.code === 'P2025') {
                return res.status(404).json({ message: "Item não encontrado no carrinho." });
            }
            return res.status(500).json({ message: e.message });
        }
    }

    public static async removeFromCart(req: Request, res: Response) {
        try {
            const { id, variantId } = req.params;

            await prisma.cartItem.delete({
                where: {
                    userId_variantId: { userId: Number(id), variantId: Number(variantId) }
                }
            });

            return res.status(204).send();
        } catch (e: any) {
            if (e.code === 'P2025') {
                return res.status(404).json({ message: "Item não encontrado no carrinho." });
            }
            return res.status(500).json({ message: e.message });
        }
    }
}