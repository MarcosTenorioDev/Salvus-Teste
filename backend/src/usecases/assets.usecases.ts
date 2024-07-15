import {
	AssetRepository,
	IAsset,
	IAssetCreate,
	IAssetCreatePrisma,
} from "../interfaces/asset.interface";
import S3Storage from "../utils/s3.utils";

class AssetUseCase {
	private assetRepository: AssetRepository;
	private s3 = new S3Storage();
	constructor(assetRepository: AssetRepository) {
		this.assetRepository = assetRepository;
	}

	async createAsset(data: IAssetCreate[] | IAssetCreate): Promise<IAsset[]> {
		const assetsData: IAssetCreate[] = Array.isArray(data) ? data : [data];
		const assets: IAssetCreatePrisma[] = [];

		for (const assetData of assetsData) {
			const mimeTypeMatch = assetData.base64Data.match(
				/^data:image\/(\w+);base64,/
			);
			if (!mimeTypeMatch) {
				throw new Error("Formato de base64 não reconhecido");
			}
            //something like jpeg, png, etc...
			const fileExtension = mimeTypeMatch[1];

            //Base 64 value without prefix
			const base64Image = assetData.base64Data.replace(
				/^data:image\/\w+;base64,/,
				""
			);

			const buffer = Buffer.from(base64Image, "base64");
			const fileName = `asset-${Date.now()}.${fileExtension}`;

			// Upload file to s3
			const result = await this.s3.uploadFile(fileName, buffer);
			if (!result) {
				throw new Error(
					"Houve um erro ao processar sua requisição, por favor, contate o suporte técnico"
				);
			}

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
}
export { AssetUseCase };
