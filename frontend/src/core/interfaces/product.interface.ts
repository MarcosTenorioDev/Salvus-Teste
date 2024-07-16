import { IAsset } from "./asset.interface";

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	createdAt: string;
	userId: string;
	assets: IAsset[] | [];
	user: { firstName: string; lastName: string };
}

export interface IProductCard {
	id: string;
	name: string;
	description: string;
	price: number;
	assets: IAsset[] | [];
	navigateTo: string;
}

export interface IProductCreate{
    name:string,
    description:string,
    price:number
    assets:IAsset[]|[]
}
