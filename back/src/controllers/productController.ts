import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

class ProductController {
  public static async createProduct(request: Request, response: Response) {
    try {
      const { name, brand, description, price, salePrice, pathImage, category, collection } = request.body;

      const createInput: Prisma.ProductCreateInput = {
        name: name,
        brand: brand,
        description: description,
        price: price,
        salePrice: salePrice,
        pathImage: pathImage,
        category: category,
        collection: collection,
      };

      const createdProduct = await prisma.product.create({
        data: createInput,
      });

      response.status(201).json(createdProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async getProductById(request: Request, response: Response) {
    try {
      const { productId } = request.params;

      const foundProduct = await prisma.product.findUnique({
        where: {
          id: Number(productId),
          isActive: true,
        },
      });

      if (!foundProduct) {
        return response.status(404).json({ message: "Produto não encontrado" });
      }

      response.status(200).json(foundProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async getProducts(request: Request, response: Response) {
    try {
      const { category, isActive } = request.query;

      const foundProducts = await prisma.product.findMany({
        where: {
          ...(category && { category: category as Prisma.EnumCategoryTypeFilter }),
          isActive: isActive !== undefined ? isActive === "true" : true,
        },
        orderBy: { createdAt: "desc" },
      });

      response.status(200).json(foundProducts);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateProduct(request: Request, response: Response) {
    try {
      const { name, brand, description, price, salePrice, pathImage, category, collection, isActive } = request.body;
      const { productId } = request.params;

      const updateInput: Prisma.ProductUpdateInput = {
        name: name,
        brand: brand,
        description: description,
        price: price,
        salePrice: salePrice,
        pathImage: pathImage,
        category: category,
        collection: collection,
        isActive: isActive,
      };

      const updatedProduct = await prisma.product.update({
        data: updateInput,
        where: {
          id: Number(productId),
        },
      });

      response.status(200).json(updatedProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async softDeleteProduct(request: Request, response: Response) {
    try {
      const { productId } = request.params;

      const deactivatedProduct = await prisma.product.update({
        where: {
          id: Number(productId),
        },
        data: {
          isActive: false,
        },
      });

      response.status(200).json(deactivatedProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}

export { ProductController };
