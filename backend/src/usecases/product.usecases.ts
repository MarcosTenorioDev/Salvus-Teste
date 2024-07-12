import { ProductRepository, IProduct } from "../interfaces/product.interface";

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
}

export {ProductUseCase}
