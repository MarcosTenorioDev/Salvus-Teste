export interface IAsset {
	id: string;
	productId: string;
	type: string;
	url: string;
	description: string | null;
}
export interface IAssetCreate {
	type: string;
	path: string;
	description: string |null;
}
export interface IAssetCreateProduct{
	type: string;
	path: string;
	description: string |null;
	productId:string
}

export interface IAssetCreatePrisma {
	productId: string
	type: string;
	url: string;
	description: string | null;
}

export interface AssetRepository {
	create(asset: IAssetCreatePrisma[]): Promise<IAsset[]>;
	delete(id:string):Promise<void>
	getAssetById(id:string):Promise<IAsset | null>
}
