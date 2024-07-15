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