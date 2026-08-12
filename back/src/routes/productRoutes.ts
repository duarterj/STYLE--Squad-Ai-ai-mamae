import { Router } from "express";
import { ProductController } from "../controllers/productController";

const productRoutes = Router();

productRoutes.post("/product", ProductController.createProduct);
productRoutes.get("/product/:productId", ProductController.getProductById);
productRoutes.get("/products", ProductController.getProducts);
productRoutes.put("/product/:productId", ProductController.updateProduct);
productRoutes.delete("/product/:productId", ProductController.softDeleteProduct);

export default productRoutes;