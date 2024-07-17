import { IAsset, IAssetCreate } from "./asset.interface"

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
    assets?: IAssetCreate[] | []
}

export interface IProductUpdate{
    id:string,
    name:string,
    description:string,
    price: number,
    deleteAssetsIds: string[] | []
    assets?: IAssetCreate[] | []
}

export interface ProductRepository{
    getAllProducts():Promise <IProduct[] | []>;
    getProductById(id:string):Promise <IProduct | null>
    create(data:IProductCreate):Promise<IProduct>;
    deleteProductById(id:string):Promise<void>;
    getAllUserProducts(externalId:string) :Promise<IProduct[] | []>
    update(data:IProductUpdate): Promise<IProduct>
}