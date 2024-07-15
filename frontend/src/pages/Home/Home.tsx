import ProductCard from "@/components/cards/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/core/interfaces/product.interface";
import ProductService from "@/core/services/product.service";
import { useEffect, useState } from "react";

const Home = () => {
	const productsService = new ProductService();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getAllProducts();
	}, []);

	async function getAllProducts() {
		const response = await productsService.getAllProducts();
		setProducts(response.data);
		console.log(response.data);
		setIsLoading(false);
	}

	const LoadingComponent = () => {
		return (
			<div className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 py-20">
				<Skeleton className="w-full h-60 bg-gray-300" />
				<Skeleton className="w-full h-60 bg-gray-300" />
				<Skeleton className="w-full h-60 bg-gray-300" />
				<Skeleton className="w-full h-60 bg-gray-300" />
				<Skeleton className="w-full h-60 bg-gray-300 hidden sm:block" />
				<Skeleton className="w-full h-60 bg-gray-300 hidden sm:block" />
				<Skeleton className="w-full h-60 bg-gray-300 hidden sm:block" />
				<Skeleton className="w-full h-60 bg-gray-300 hidden sm:block" />
			</div>
		);
	};
	return (
		<div className="max-w-7xl mx-auto px-4">
			{isLoading ? (
				LoadingComponent()
			) : (
				<>
					<div className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 py-20">
						{products.map((product: IProduct) => {
							return (
								<ProductCard
									assets={product.assets}
									description={product.description}
									name={product.name}
									id={product.id}
									price={product.price}
									key={product.id}
									createdAt={product.createdAt}
									userId={product.userId}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
