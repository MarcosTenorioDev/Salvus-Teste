import { Router, Request, Response } from "express";
import { ProductRepositoryPrisma } from "../repositories/product.repository";
import { ProductUseCase } from "../usecases/product.usecases";

const router = Router();
const productRepository = new ProductRepositoryPrisma()
const productUseCase = new ProductUseCase(productRepository)

router.get("/", async (req: Request, res: Response) => {
	try {
		const products = await productUseCase.getAllProducts();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(error);
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const product = await productUseCase.getProductById(id);
        res.status(200).json(product);
	} catch (error) {
		res.status(404).json(error);
	}
});

export default router;
