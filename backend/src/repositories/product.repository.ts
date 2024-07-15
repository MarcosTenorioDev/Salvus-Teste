import { prisma } from "../db/prisma-client";
import { IAsset, IAssetCreate } from "../interfaces/asset.interface";
import {
	IProduct,
	IProductCreate,
	ProductRepository,
} from "../interfaces/product.interface";
import { AssetUseCase } from "../usecases/assets.usecases";
import { AssetRepositoryPrisma } from "./asset.repository";

class ProductRepositoryPrisma implements ProductRepository {
	async getAllProducts(): Promise<IProduct[] | []> {
		try {
			return await prisma.product.findMany({
				include: {
					assets: true,
				},
			});
		} catch (err) {
			throw new Error(
				"Não foi possível encontrar todos os produtos, por favor, entre em contato com o suporte técnico"
			);
		}
	}

	async getProductById(id: string): Promise<IProduct | null> {
		try {
			return await prisma.product.findUnique({
				where: { id },
				include: {
					assets: true,
				},
			});
		} catch (err) {
			throw new Error(
				"Não foi possível esse produto, por favor, entre em contato com o suporte técnico"
			);
		}
	}

	async create(data: IProductCreate): Promise<IProduct> {
		try {
			return await prisma.$transaction(async (prisma) => {
				const createdProduct = await prisma.product.create({
					data: {
						name: data.name,
						description: data.description,
						price: data.price,
						userId: data.userId,
					},
				});
				const assetRepository = new AssetRepositoryPrisma();
				const assetUseCase = new AssetUseCase(assetRepository);
				const createdAssets: IAsset[] | [] = data.assets
					? await assetUseCase.createAsset(data.assets)
					: [];

					console.log(createdAssets)
				const product: IProduct = {
					...createdProduct,
					assets: createdAssets,
				};

				return product;
			});
		} catch (error) {
			console.error("Error creating product and assets:", error);
			throw new Error(`Erro ao criar produto, ${error}`);
		}
	}

	async deleteProductById(id: string): Promise<void> {
		try {
			await prisma.product.delete({
				where: {
					id,
				},
			});
		} catch (err) {
			throw new Error(`Erro ao excluir o produto, ${err}`);
		}
	}
}

export { ProductRepositoryPrisma };
