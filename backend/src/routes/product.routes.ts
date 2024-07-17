import { Router, Request, Response } from "express";
import { ProductRepositoryPrisma } from "../repositories/product.repository";
import { ProductUseCase } from "../usecases/product.usecases";
import { jwtValidator } from "../middlewares/auth.middlewares";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { UserUseCase } from "../usecases/user.usecases";
import multer from "multer";
import { IAssetCreate } from "../interfaces/asset.interface";
import fs from "fs";

const router = Router();
const userRepository = new UserRepositoryPrisma();
const userUseCase = new UserUseCase(userRepository);
const productRepository = new ProductRepositoryPrisma();
const productUseCase = new ProductUseCase(productRepository, userRepository);

const upload = multer({ dest: "tmp/" });

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
	upload.array("assets"),
	async (req: Request<{ externalId: string }>, res: Response) => {
		const { description, name, price } = req.body;
		const { externalId } = req.params;
		try {
			const user = await userUseCase.findByExternalId(externalId);
			if (!user) {
				(req.files as Express.Multer.File[]).map((file) => {
					fs.unlinkSync(file.path);
				});
				res.status(403).json("Operação não permitida");
				return;
			}
			const numericPrice = parseFloat(price);
			if (isNaN(numericPrice)) {
				(req.files as Express.Multer.File[]).map((file) => {
					fs.unlinkSync(file.path);
				});
				throw new Error("O campo 'price' deve ser um número válido.");
			}
			const assets = (req.files as Express.Multer.File[]).map(
				(file): IAssetCreate => {
					return {
						type: file.mimetype,
						description: `asset-${new Date().toISOString()}.${file.mimetype}`,
						path: file.path,
					};
				}
			);
			const product = await productUseCase.create({
				description,
				name,
				price: numericPrice,
				userId: user.id,
				assets: assets,
			});
			res.status(201).json(product);
		} catch (err) {
			res.status(400).json(`${err}`);
		}
	}
);

router.delete("/:id", jwtValidator, async (req: Request, res: Response) => {
	const { externalId, id } = req.params;
	try {
		await productUseCase.deleteProductById(id, externalId);
		res.status(204).json("Produto excluído com sucesso");
	} catch (err) {
		res.status(404).send(err);
	}
});

export default router;
