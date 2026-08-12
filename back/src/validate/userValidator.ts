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

const user = z.object({
    firstName: z.string("O nome é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres"),

    lastName: z.string("O sobrenome é obrigatório")
        .min(3, "O sobrenome deve ter no mínimo 3 caracteres"),

    email: z.string("O email é obrigatório")
        .email("Formato de email inválido"),

    password: z.string("A senha é obrigatória")
        .min(8, "A senha deve ter no mínimo 8 caracteres"),

    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    phoneNumber: z.string().optional(),
    dateBirth: z.string().optional(),

    emailNotification: z.boolean().optional(),
    smsNotification: z.boolean().optional(),
    marketingEmail: z.boolean().optional(),
    orderUpdate: z.boolean().optional(),
    newArrival: z.boolean().optional(),
    saleAlert: z.boolean().optional(),
});

export const UserValidator = {
    createUser: user,
    updateUser: user.partial(),
};