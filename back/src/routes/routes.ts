import { Router } from "express";
import { UserController } from "../controllers/userController";
import { ProductController } from "../controllers/productController";
import { VariantController } from "../controllers/variantController";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { validateRequestBodyData, UserValidator } from "../validate/userValidator";

const router = Router();

// ############################## USER ROUTES

router.post("/users", validateRequestBodyData(UserValidator.createUser), UserController.create);
router.post("/users/login", UserController.login);
router.get("/users", AuthMiddleware.execute, UserController.getUsers);
router.get("/users/:id", AuthMiddleware.execute, UserController.getUserById);
router.put("/users/:id",AuthMiddleware.execute,validateRequestBodyData(UserValidator.updateUser),UserController.updateUser);
router.patch("/users/:id/preferences",AuthMiddleware.execute,validateRequestBodyData(UserValidator.updateUser),UserController.updatePreferences);
router.delete("/users/:id", AuthMiddleware.execute, UserController.deleteUser);

// ############################## PRODUCT ROUTES

router.post("/product", ProductController.createProduct);
router.get("/product/:productId", ProductController.getProductById);
router.get("/products", ProductController.getProducts);
router.put("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.softDeleteProduct);

// ############################## VARIANT ROUTES

router.post("/variant", VariantController.createVariant);
router.get("/variant/:variantId", VariantController.getVariantById);
router.get("/variants", VariantController.getVariants);
router.put("/variant/:variantId", VariantController.updateVariant);
router.delete("/variant/:variantId", VariantController.deleteVariant);

export { router };