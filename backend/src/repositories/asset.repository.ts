import { prisma } from "../db/prisma-client";
import {
	AssetRepository,
	IAsset,
	IAssetCreate,
	IAssetCreatePrisma,
} from "../interfaces/asset.interface";

class AssetRepositoryPrisma implements AssetRepository {
	async create(assets: IAssetCreatePrisma[]): Promise<IAsset[]> {
		try {
			return await Promise.all(
				assets.map(async (asset) => {
					return prisma.asset.create({
						data: {
							productId:asset.productId,
							type: asset.type,
							url: asset.url,
							description: asset.description,
						},
					});
				})
			);
		} catch (err) {
			throw new Error("Erro ao criar assets");
		}
	}
}

export { AssetRepositoryPrisma };
