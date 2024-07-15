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

	async delete(id: string): Promise<void> {
		try{
			await prisma.asset.delete({
				where:{
					id
				}
			})
		}catch(err){
			throw new Error("Houve um erro ao excluir o asset do produto")
		}
	}

	async getAssetById(id: string): Promise<IAsset | null> {
		try{
			return await prisma.asset.findUnique({
				where:{
					id
				}
			})
		}catch(err){
			throw new Error("Não foi possível encontrar o asset do produto")
		}
	}
}

export { AssetRepositoryPrisma };
