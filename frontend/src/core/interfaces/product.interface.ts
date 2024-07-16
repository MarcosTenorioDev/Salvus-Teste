import { IAsset } from "./asset.interface";

export interface IProduct{
    id:string,
    name:string,
    description:string,
    price:number,
    createdAt:string,
    userId:string,
    assets:IAsset[] | []
}

export interface IProductCard{
    id:string,
    name:string,
    description:string,
    price:number,
    assets:IAsset[] | []
    navigateTo: string
}