import ProductCard from "@/components/cards/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/core/interfaces/product.interface";
import ProductService from "@/core/services/product.service";
import { useEffect, useRef, useState } from "react";
import herobg from "@/assets/images/hero-bg.webp";
import { useT } from "@/assets/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
	const t = useT();
	const productsService = new ProductService();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [globalFilter, setGlobalFilter] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const productsPerPage = 8;
	const productsSectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		getAllProducts();
	}, []);

	useEffect(() => {
		filterProducts();
	}, [globalFilter, products, currentPage]);

	async function getAllProducts() {
		const response = await productsService.getAllProducts();
		setProducts(response.data);
		setIsLoading(false);
		filterProducts(response.data);
	}

	function filterProducts(allProducts = products) {
		let filtered = allProducts;

		if (globalFilter !== "") {
			const lowercasedFilter = globalFilter.toLowerCase();
			filtered = allProducts.filter(
				(product) =>
					product.name.toLowerCase().includes(lowercasedFilter) ||
					product.description.toLowerCase().includes(lowercasedFilter)
			);
		}

		const indexOfLastProduct = currentPage * productsPerPage;
		const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
		const currentProducts = filtered.slice(
			indexOfFirstProduct,
			indexOfLastProduct
		);

		setFilteredProducts(currentProducts);
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

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
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
					<div className="relative flex w-full max-w-lg mx-auto items-center space-x-2 mt-10">
						<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 ml-2" />
						<Input
							placeholder={t(
								"application.pages.homepage.searchInputPlaceholder"
							)}
							value={globalFilter}
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="max-w-xl border-primary w-full py-2 pl-12 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ${
								globalFilter ? "" : "hidden"
							}`}
							onClick={() => setGlobalFilter("")}
						>
							<XIcon className="h-4 w-4" />
							<span className="sr-only">Clear</span>
						</Button>
					</div>
					<main
						ref={productsSectionRef}
						className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 py-10"
					>
						{filteredProducts.map((product: IProduct) => (
							<ProductCard
								assets={product.assets}
								description={product.description}
								name={product.name}
								id={product.id}
								price={product.price}
								key={product.id}
								navigateTo={`/product/${product.id}`}
							/>
						))}
					</main>
					<Pagination className="mb-14">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									className={currentPage === Math.ceil(products.length / productsPerPage) ? "": "cursor-pointer"}
								/>
							</PaginationItem>
							{Array.from({
								length: Math.ceil(products.length / productsPerPage),
							}).map((_, index) => (
								<PaginationItem key={index}>
									<PaginationLink
										onClick={() => handlePageChange(index + 1)}
										className={currentPage === index + 1 ? "active border-primary bg-primary/50 cursor-pointer" : "cursor-pointer"}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									onClick={() => handlePageChange(currentPage + 1)}
									className={currentPage === Math.ceil(products.length / productsPerPage) ? "": "cursor-pointer"}
									disabled={
										currentPage === Math.ceil(products.length / productsPerPage)
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</>
			)}
		</div>
	);
};

export default Home;
