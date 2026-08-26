import { Request, Response } from 'express';
import { prisma } from "../config/prisma";

export class WishlistItemController {

    public static async addProductWishlist(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { productId } = req.body;

            const userExists = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!userExists) return res.status(404).json({ message: "Usuário não encontrado." });

            const productExists = await prisma.product.findUnique({ where: { id: Number(productId) } });
            if (!productExists) return res.status(404).json({ message: "Produto não encontrado." });

            const wishlistItem = await prisma.wishlistItem.create({
                data: {
                    userId: Number(id),
                    productId: Number(productId)
                }
            });

            return res.status(201).json({ message: "Produto adicionado à lista de desejos", wishlistItem });
        } catch (e: any) {
            if (e.code === 'P2002') {
                return res.status(409).json({ message: "Este produto já está na sua lista de desejos." });
            }
            return res.status(500).json({ message: e.message });
        }
    }

    public static async getWishlist(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userExists = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!userExists) return res.status(404).json({ message: "Usuário não encontrado." });

            const wishlist = await prisma.wishlistItem.findMany({
                where: { userId: Number(id) },
                include: {
                    product: {
                        include: {
                            variants: true
                        }
                    }
                }
            });

            return res.status(200).json(wishlist);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async removeProductWishlist(req: Request, res: Response) {
        try {
            const { id, productId } = req.params;

            await prisma.wishlistItem.delete({
                where: {
                    userId_productId: {
                        userId: Number(id),
                        productId: Number(productId)
                    }
                }
            });

            return res.status(204).send();
        } catch (e: any) {
            if (e.code === 'P2025') {
                return res.status(404).json({ message: "Produto não encontrado na sua wishlist." });
            }
            return res.status(500).json({ message: e.message });
        }
    }
}