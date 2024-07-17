import { randomUUID } from "crypto";
import {
	AssetRepository,
	IAsset,
	IAssetCreatePrisma,
	IAssetCreateProduct,
} from "../interfaces/asset.interface";
import { ProductRepository } from "../interfaces/product.interface";
import { UserRepository } from "../interfaces/user.interface";
import S3Storage from "../utils/s3.utils";
import fs from "fs";

class AssetUseCase {
	private assetRepository: AssetRepository;
	private productRepository: ProductRepository;
	private userRepository: UserRepository;
	private s3 = new S3Storage();
	constructor(
		assetRepository: AssetRepository,
		productRepository: ProductRepository,
		userRepository: UserRepository
	) {
		this.assetRepository = assetRepository;
		this.productRepository = productRepository;
		this.userRepository = userRepository;
	}

	async createAsset(
		data: IAssetCreateProduct[] | IAssetCreateProduct
	): Promise<IAsset[]> {
		const assetsData: IAssetCreateProduct[] = Array.isArray(data)
			? data
			: [data];
		const assets: IAssetCreatePrisma[] = [];

		for (const assetData of assetsData) {
			const product = await this.productRepository.getProductById(
				assetData.productId
			);

			if (!product) {
				fs.unlinkSync(assetData.path);
				throw new Error("Id do produto não existente");
			}
			const file = fs.readFileSync(assetData.path);

			// Upload file to s3
			const result = await this.s3.uploadFile(
				assetData.description ||
					`asset-${new Date().toISOString()}.${randomUUID()}.${assetData.type}`,
				file
			);
			if (!result) {
				fs.unlinkSync(assetData.path);
				throw new Error(
					"Houve um erro ao processar sua requisição, por favor, contate o suporte técnico"
				);
			}

			fs.unlinkSync(assetData.path);
			const imageUrl = `https://${result.Bucket}.s3.amazonaws.com/${result.Key}`;

			//Get the payload to prisma with the URL
			const payloadPrisma: IAssetCreatePrisma = {
				description: assetData.description,
				productId: assetData.productId,
				type: assetData.type,
				url: imageUrl,
			};

			assets.push(payloadPrisma);
		}
		const assetsResult = await this.assetRepository.create(assets);

		return assetsResult;
	}

	async delete(id: string, externalId: string) {
		const asset = await this.assetRepository.getAssetById(id);
		if (!asset) {
			throw new Error("Asset não encontrado");
		}
		const product = await this.productRepository.getProductById(
			asset.productId
		);
		if (!product) {
			throw new Error("Produto não encontrado");
		}
		const user = await this.userRepository.findUserByExternalId(externalId);
		if (!user) {
			throw new Error(
				"Operação não permitida, por favor, contatar o suporte técnico"
			);
		}

		//Created in the cases that a user try to delete assets from other people...
		if (product.userId !== user.id) {
			throw new Error(
				"Operação não permitida, por favor, contatar o suporte técnico"
			);
		}

		return await this.assetRepository.delete(id);
	}
}
export { AssetUseCase };
