import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validateRequestBodyData<T>(schema: z.ZodSchema<T>) {
    return (request: Request, response: Response, next: NextFunction) => {
        const validate = schema.safeParse(request.body);

        if (!validate.success) {
            response.status(400).json({
                message: "Erro de validação dos dados",
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        next();
    };
}

const product = z.object({
    name: z.string()
        .min(3, "O nome deve ter no mínimo 3 caracteres"),

    brand: z.string().optional(),

    description: z.string()//Não sei quantos caracteres tem que ter uma descrição
        .min(10, "A descrição deve ter no mínimo 10 caracteres"),

    price: z.coerce.number()
        .positive("O preço deve ser maior que zero"),

    salePrice: z.coerce.number()
        .positive("O preço promocional deve ser maior que zero")
        .optional(),

    pathImage: z.string().optional(),

    category: z.enum(['TOPS', 'BOTTOMS', 'SHOES', 'DRESSES', 'ACCESSORIES']),

    collection: z.string().optional(),

    isActive: z.boolean().optional(),
});

export const ProductValidator = {
    createProduct: product,
    updateProduct: product.partial(),
};