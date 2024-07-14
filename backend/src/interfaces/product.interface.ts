import { IAsset } from "./asset.interface"

export interface IProduct{
    id:string,
    name:string,
    description:string,
    price: number,
    createdAt: Date,
    userId: string
    assets: IAsset[] | []
}
export interface IProductCreate{
    name:string,
    description:string,
    price: number,
    userId: string,
    assets?: IAsset[] | []
}

export interface ProductRepository{
    getAllProducts():Promise <IProduct[] | []>;
    getProductById(id:string):Promise <IProduct | null>
    create(data:IProductCreate):Promise<IProduct>;
    deleteProductById(id:string):Promise<void>;
}