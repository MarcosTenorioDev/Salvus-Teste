import { prisma } from "../db/prisma-client";
import { IAsset, IAssetCreate } from "../interfaces/asset.interface";
import {
	IProduct,
	IProductCreate,
	ProductRepository,
} from "../interfaces/product.interface";
import { AssetUseCase } from "../usecases/assets.usecases";
import { AssetRepositoryPrisma } from "./asset.repository";
import { UserRepositoryPrisma } from "./user.repository";

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
					user:{
						select:{
							firstName:true,
							lastName:true
						}
					}
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
			const product = await prisma.product.create({
				data: {
					name: data.name,
					description: data.description,
					price: data.price,
					userId: data.userId,
				},
			});

			const assetRepository = new AssetRepositoryPrisma();
			const userRepository = new UserRepositoryPrisma();
			const assetUseCase = new AssetUseCase(
				assetRepository,
				this,
				userRepository
			);
			const assetsWithProductId = data.assets?.map((asset: IAssetCreate) => ({
				type: asset.type,
				description: asset.description,
				productId: product.id,
				path: asset.path,
			}));
			const createdAssets: IAsset[] | [] = assetsWithProductId
				? await assetUseCase.createAsset(assetsWithProductId)
				: [];

			return {
				...product,
				assets: createdAssets,
			};
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

	async getAllUserProducts(id: string): Promise<IProduct[] | []> {
		try {
			const products = await prisma.product.findMany({
				where: {
					userId: id,
				},
				include: {
					assets: true,
				},
			});
			return products;
		} catch (err) {
			throw new Error(
				"Não foi possível encontrar os produtos do usuário, por favor, contatar o suporte técnico"
			);
		}
	}
}

export { ProductRepositoryPrisma };
