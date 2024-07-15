import { IAsset, IAssetCreate } from "../interfaces/asset.interface";
import {
	ProductRepository,
	IProduct,
	IProductCreate,
} from "../interfaces/product.interface";
import { UserRepository } from "../interfaces/user.interface";

class ProductUseCase {
	private productRepository: ProductRepository;
	private userRepository: UserRepository;

	constructor(
		productRepository: ProductRepository,
		userRepository: UserRepository
	) {
		this.productRepository = productRepository;
		this.userRepository = userRepository;
	}

	async getAllProducts(): Promise<IProduct[] | []> {
		const products = await this.productRepository.getAllProducts();
		return products;
	}

	async getProductById(id: string): Promise<IProduct | null> {
		const product = await this.productRepository.getProductById(id);
		if (!product) throw new Error("Produto não encontrado");
		return product;
	}

	async create(data: IProductCreate): Promise<IProduct> {
		const product = await this.productRepository.create(data);
		return product;
	}

	async deleteProductById(id: string, externalId: string): Promise<void> {
		const product = await this.productRepository.getProductById(id);
		const user = await this.userRepository.findUserByExternalId(externalId);
		if (!product) {
			throw new Error("Produto não encontrado");
		}

		if (!user) {
			throw new Error(
				"Usuário não encontrado, por favor, contatar o suporte técnico"
			);
		}
		if (user.id !== product.userId) {
			throw new Error("Operação não permitida");
		}
		return await this.productRepository.deleteProductById(id);
	}
}

export { ProductUseCase };
