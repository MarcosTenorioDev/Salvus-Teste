export interface IAsset { 
    id: string; 
    productId: string;
    type: string;
    url: string; 
    description: string | null;
}
export interface IAssetCreate { 
    productId: string;
    type: string;
    url: string;
    description: string | null;
}