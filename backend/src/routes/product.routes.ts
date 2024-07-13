import { Router, Request, Response } from "express";
import { ProductRepositoryPrisma } from "../repositories/product.repository";
import { ProductUseCase } from "../usecases/product.usecases";
import { jwtValidator } from "../middlewares/auth.middlewares";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { IProductCreate } from "../interfaces/product.interface";
import { UserUseCase } from "../usecases/user.usecases";

const router = Router();
const userRepository = new UserRepositoryPrisma();
const userUseCase = new UserUseCase(userRepository)
const productRepository = new ProductRepositoryPrisma();
const productUseCase = new ProductUseCase(productRepository);

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

router.post(
	"/",
	jwtValidator,
	async (
		req: Request<{ body: IProductCreate; externalId: string }>,
		res: Response
	) => {
		const {description, name, price, assets } =
			req.body;
		const { externalId } = req.params;
		try {
			const user = await userUseCase.findByExternalId(externalId);
			if(!user){
				res.status(403).json("Operação não permitida");
				return
			}
			const product = await productUseCase.create({
				description,
				name,
				price,
				userId:user.id,
				assets,
			});
			res.status(201).json(product);
		} catch (err) {
			res.status(400).json(err)
		}
	}
);

export default router;
