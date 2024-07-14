import { prisma } from "../db/prisma-client";
import { IAsset } from "../interfaces/asset.interface";
import {
	IProduct,
	IProductCreate,
	ProductRepository,
} from "../interfaces/product.interface";

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

				const createdAssets : IAsset[] | [] = data.assets
					? await Promise.all(
							data?.assets.map(async (asset) => {
								return prisma.asset.create({
									data: {
										productId: createdProduct.id,
										type: asset.type,
										url: asset.url,
										description: asset.description,
									},
								});
							})
					  )
					: [];

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

	async deleteProductById(id:string):Promise<void>{
		try{
			await prisma.product.delete({
				where: {
					id
				}
			})
		}catch(err){
			throw new Error(`Erro ao excluir o produto, ${err}`);
		}
	}
}

export { ProductRepositoryPrisma };
