import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "@/core/services/product.service";
import { IProduct } from "@/core/interfaces/product.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { IAsset } from "@/core/interfaces/asset.interface";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useT } from "@/assets/i18n";

const ProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<IProduct | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState<IAsset | null>(null);
	const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
	const t = useT();

	const productService = new ProductService();

	useEffect(() => {
		const getProduct = async () => {
			if (id) {
				setIsLoading(true);
				try {
					const response = await productService.getProductById(id);
					setProduct(response.data);
					const isValidImage = response.data.assets.find(
						(asset: IAsset) => !imageErrors.has(asset.id)
					);
					setSelectedImage(isValidImage || null);
					setError(null);
				} catch (err) {
					setError("Produto não encontrado");
					setProduct(null);
				} finally {
					setIsLoading(false);
				}
			}
		};

		getProduct();
	}, [id]);

	const handleImageError = (assetId: string) => {
		setImageErrors((prevErrors) => new Set(prevErrors).add(assetId));
	};

	const handleImageClick = (image: IAsset) => {
		setSelectedImage(image);
	};

	if (isLoading) {
		return (
			<div className="max-w-7xl mx-auto my-10">
				<div className="flex flex-col md:flex-row">
					<div className="w-full max-w-7xl mx-auto px-4 md:py-8">
						<Skeleton className="bg-gray-300 w-full h-[220px] md:h-[380px] md:mx-0 mx-auto" />
						<div className="flex gap-4 w-full h-auto md:h-[380px] md:mx-0 mx-auto mt-10">
							<Skeleton className="bg-gray-300 w-full h-24" />
							<Skeleton className="bg-gray-300 w-full h-24" />
							<Skeleton className="bg-gray-300 w-full h-24" />
							<Skeleton className="bg-gray-300 w-full h-24 hidden sm:block" />
						</div>
					</div>
					<div className="w-full py-8 flex flex-col gap-6 px-4">
						<Skeleton className="bg-gray-300 w-full h-10" />
						<Skeleton className="bg-gray-300 w-1/4 h-10" />
						<Skeleton className="bg-gray-300 w-3/4 h-10" />
						<Skeleton className="bg-gray-300 w-3/4 h-10" />
					</div>
				</div>
			</div>
		);
	}

	/* TODO: TRATAMENTO DE ERRO COM TOAST */
	if (error) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-8">
				<p className="text-red-600">{error}</p>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
			{product ? (
				<>
					<div className="w-full h-auto md:w-[380px] md:h-[380px] md:mx-0 mx-auto">
						<Card className="aspect-video md:aspect-square">
							<img
								src={
									selectedImage?.url ||
									"https://salvus-image-database.s3.us-east-2.amazonaws.com/default.jpg"
								}
								alt="Imagem do produto"
								className="w-full h-full object-contain"
							/>
						</Card>
						<Carousel
							orientation="horizontal"
							opts={{
								loop: false,
							}}
						>
							<CarouselContent className="p-4">
								{product.assets
									.filter((asset) => !imageErrors.has(asset.id)) // Filtra imagens com erro
									.map((asset: IAsset) => {
										return (
											<CarouselItem className="basis-auto" key={asset.id}>
												<img
													src={asset.url}
													alt={asset.description}
													className={`rounded-lg cursor-pointer w-28 aspect-video object-contain hover:border hover:border-primary border`}
													onError={() => handleImageError(asset.id)}
													onMouseEnter={() => handleImageClick(asset)}
												/>
											</CarouselItem>
										);
									})}
							</CarouselContent>
							<CarouselPrevious
								className={`${selectedImage ? "" : "hidden"}`}
							/>
							<CarouselNext className={`${selectedImage ? "" : "hidden"}`} />
						</Carousel>
					</div>
					<div className="w-full md:w-[calc(100%-380px)] flex flex-col gap-2">
						<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
						{product.user ? (
							<p className="text-sm text-gray-500">
								Publicado por: {product.user.firstName} {product.user.lastName}
							</p>
						) : (
							""
						)}
						<p className="text-sm text-gray-500">
							Publicado em: {new Date(product.createdAt).toLocaleDateString()}
						</p>
						<h3 className="text-5xl font-semibold mb-4">
							{t("application.global.currencyPrefix")}
							{product.price.toFixed(2)}
						</h3>
						<p className="text-lg mt-2">{product.description}</p>
					</div>
				</>
			) : (
				<p className="text-xl font-semibold text-red-600">
					Produto não encontrado
				</p>
			)}
		</div>
	);
};

export default ProductPage;
