import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

class VariantController {
  public static async createVariant(request: Request, response: Response) {
    try {
      const { color, size, stock, productId } = request.body;

      const createInput: Prisma.VariantCreateInput = {
        color: color,
        size: size,
        stock: stock,
        product: {
          connect: { id: Number(productId) },
        },
      };

      const product = await prisma.product.findUnique({
        where: {
        id: Number(productId),
        },
      });

      if (!product) {
        return response.status(404).json({
          message: "Produto não encontrado",
        });
      }

      const createdVariant = await prisma.variant.create({
        data: createInput,
      });

      response.status(201).json(createdVariant);
    } catch (error: any) {
      if (error.code === "P2002") {
        return response.status(409).json({
          message: "Já existe uma variante com essa cor e tamanho para esse produto",
        });
      }

      response.status(500).json({ message: error.message });
    }
  }

  public static async getVariantById(request: Request, response: Response) {
    try {
      const { variantId } = request.params;

      const foundVariant = await prisma.variant.findUnique({
        where: {
          id: Number(variantId),
        },
        include: { product: true },
      });

      if (!foundVariant) {
        return response.status(404).json({ message: "Variante não encontrada" });
      }

      response.status(200).json(foundVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async getVariants(request: Request, response: Response) {
    try {
      const { productId } = request.query;

      const foundVariants = await prisma.variant.findMany({
        where: {
          ...(productId && { productId: Number(productId) }),
        },
      });

      response.status(200).json(foundVariants);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateVariant(request: Request, response: Response) {
    try {
      const { color, size, stock } = request.body;
      const { variantId } = request.params;

      const updateInput: Prisma.VariantUpdateInput = {
        color: color,
        size: size,
        stock: stock,
      };

      const updatedVariant = await prisma.variant.update({
        data: updateInput,
        where: {
          id: Number(variantId),
        },
      });

      response.status(200).json(updatedVariant);
    } catch (error: any) {
      if (error.code === "P2002") {
        return response.status(409).json({
          message: "Já existe uma variante com essa cor e tamanho para esse produto",
        });
      }

      response.status(500).json({ message: error.message });
    }
  }

  public static async deleteVariant(request: Request, response: Response) {
    try {
      const { variantId } = request.params;

      const deletedVariant = await prisma.variant.delete({
        where: {
          id: Number(variantId),
        },
      });

      response.status(200).json(deletedVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}

export { VariantController };