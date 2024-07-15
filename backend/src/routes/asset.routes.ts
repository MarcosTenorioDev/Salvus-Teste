import { Router, Request, Response } from "express";
import { IAssetCreate } from "../interfaces/asset.interface";
import { AssetUseCase } from "../usecases/assets.usecases";
import { AssetRepositoryPrisma } from "../repositories/asset.repository";

const router = Router();
const assetRepository = new AssetRepositoryPrisma()
const assetUseCase = new AssetUseCase(assetRepository)

router.post(
	"/",
	async (req: Request<IAssetCreate[] | IAssetCreate>, res: Response) => {
        try {
            const asset = await assetUseCase.createAsset(req.body)
            res.status(200).send(asset);
          } catch (error) {
            console.error(error);
            res.status(500).send('Error uploading file.');
          }
	}
);

export default router;
