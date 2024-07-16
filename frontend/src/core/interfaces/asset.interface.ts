export interface IAsset{
    id:string,
    productId:string,
    type:string,
    url:string,
    description:string
}

export interface IAssetProductCreate{
    type:string,
    description:string
    base64Data:string
}