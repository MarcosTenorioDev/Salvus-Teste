import { IAsset, IAssetCreate } from "../interfaces/asset.interface";
import { ProductRepository, IProduct, IProductCreate } from "../interfaces/product.interface";

class ProductUseCase {
	private productRepository: ProductRepository;

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository;
	}

    async getAllProducts():Promise <IProduct[] | []>{
        const products = await this.productRepository.getAllProducts()
        return products
    }

    async getProductById(id:string):Promise <IProduct | null>{
        const product = await this.productRepository.getProductById(id)
        if (!product) throw new Error('Produto não encontrado');
        return product
    }

    async create(data:IProductCreate):Promise<IProduct>{
       /*  if(data.assets){
            let assets: IAssetCreate[] = data.assets
            //Criar rotina para armazenar o base64 em uma url e retornar o payload com a url formatada...
        } */
        const product = await this.productRepository.create(data)
        return product
    }
}

export {ProductUseCase}
