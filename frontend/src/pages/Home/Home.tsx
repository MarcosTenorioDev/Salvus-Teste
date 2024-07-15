import ProductCard from "@/components/cards/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/core/interfaces/product.interface";
import ProductService from "@/core/services/product.service";
import { useEffect, useRef, useState } from "react";
import herobg from "@/assets/images/hero-bg.webp";
import { useT } from "@/assets/i18n";

const Home = () => {
	const t = useT();
	const productsService = new ProductService();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const productsSectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		getAllProducts();
	}, []);

	async function getAllProducts() {
		const response = await productsService.getAllProducts();
		setProducts(response.data);
		console.log(response.data);
		setIsLoading(false);
	}

	const scrollToProducts = () => {
		if (productsSectionRef.current) {
			productsSectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

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
			<section className="relative text-white py-10 md:py-20 mt-10 md:mt-10">
				<div className="absolute inset-0 overflow-hidden">
					<img
						src={herobg}
						alt="Hero Background"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-primary opacity-50"></div>
				</div>
				<div className="relative container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
						{t("application.pages.homepage.bannerTitle")}
					</h1>
					<p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6">
						{t("application.pages.homepage.bannerDescription")}
					</p>
					<a
						href="#"
						onClick={scrollToProducts}
						className="bg-secondary text-black px-4 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:opacity-90 transition"
					>
						{t("application.pages.homepage.bannerAction")}
					</a>
				</div>
			</section>
			{isLoading ? (
				LoadingComponent()
			) : (
				<>
					<main ref={productsSectionRef} className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 py-20" >
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
					</main>
				</>
			)}
		</div>
	);
};

export default Home;
