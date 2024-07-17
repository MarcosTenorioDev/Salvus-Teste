import { Router, Request, Response } from "express";
import { IAssetCreate, IAssetCreateProduct } from "../interfaces/asset.interface";
import { AssetUseCase } from "../usecases/assets.usecases";
import { AssetRepositoryPrisma } from "../repositories/asset.repository";
import { jwtValidator } from "../middlewares/auth.middlewares";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { ProductRepositoryPrisma } from "../repositories/product.repository";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "tmp/" });
const assetRepository = new AssetRepositoryPrisma();
const userRepository = new UserRepositoryPrisma();
const productRepository = new ProductRepositoryPrisma();
const assetUseCase = new AssetUseCase(
	assetRepository,
	productRepository,
	userRepository
);

router.post(
	"/",
	jwtValidator,
	upload.array("asset"),
	async (req: Request, res: Response) => {
		try {
			const {productId} = req.body
			
			const assets = (req.files as Express.Multer.File[]).map(
				(file): IAssetCreateProduct => {
					return {
						type: file.mimetype,
						description: `asset-${new Date().toISOString()}.${file.mimetype}`,
						path: file.path,
						productId: productId
					};
				}
			);
			const result = await assetUseCase.createAsset(assets);
			res.status(200).send(result);
		} catch (error) {
			console.error(error);
			res.status(500).send(`Error uploading file. ${error}`);
		}
	}
);

router.delete("/:id",
	jwtValidator,
	async (req: Request, res: Response) => {
		try {
			const { externalId, id } = req.params;

			const asset = await assetUseCase.delete(id, externalId);
			res.status(204).send("Asset excluído com sucesso");
		} catch (error) {
			console.error(error);
			res.status(500).send("Error uploading file.");
		}
	});

export default router;
