import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { validateRequestBodyData, UserValidator } from '../config/userValidator';

const router = Router();

router.post(
    '/users',
    validateRequestBodyData(UserValidator.createUser),
    UserController.create
);

router.post(
    '/users/login',
    UserController.login
);

router.get(
    '/users',
    AuthMiddleware.execute,
    UserController.getUsers
);

router.get(
    '/users/:id',
    AuthMiddleware.execute,
    UserController.getUserById
);

router.put(
    '/users/:id',
    AuthMiddleware.execute,
    validateRequestBodyData(UserValidator.updateUser),
    UserController.updateUser
);

router.patch(
    '/users/:id/preferences',
    AuthMiddleware.execute,
    validateRequestBodyData(UserValidator.updateUser),
    UserController.updatePreferences
);

router.delete(
    '/users/:id',
    AuthMiddleware.execute,
    UserController.deleteUser
);

export { router };