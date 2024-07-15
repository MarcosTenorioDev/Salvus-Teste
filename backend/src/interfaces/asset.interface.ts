export interface IAsset {
	id: string;
	productId: string;
	type: string;
	url: string;
	description: string | null;
}
export interface IAssetCreate {
	productId: string
	type: string;
	base64Data: string;
	description: string | null;
}

export interface IAssetCreatePrisma {
	productId: string
	type: string;
	url: string;
	description: string | null;
}

export interface AssetRepository {
	create(asset: IAssetCreatePrisma[]): Promise<IAsset[]>;
}
