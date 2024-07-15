import { Router, Request, Response } from "express";
import { IAssetCreate } from "../interfaces/asset.interface";
import { AssetUseCase } from "../usecases/assets.usecases";
import { AssetRepositoryPrisma } from "../repositories/asset.repository";
import { jwtValidator } from "../middlewares/auth.middlewares";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { ProductRepositoryPrisma } from "../repositories/product.repository";

const router = Router();
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
	async (req: Request<IAssetCreate[] | IAssetCreate>, res: Response) => {
		try {
			const asset = await assetUseCase.createAsset(req.body);
			res.status(200).send(asset);
		} catch (error) {
			console.error(error);
			res.status(500).send("Error uploading file.");
		}
	}
);

router.delete("/:id"),
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
	};

export default router;
