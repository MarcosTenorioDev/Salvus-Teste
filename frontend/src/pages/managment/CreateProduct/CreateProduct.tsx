import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { IAsset, IAssetProductCreate } from "@/core/interfaces/asset.interface";
import { IProduct, IProductCreate } from "@/core/interfaces/product.interface";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Input, Textarea } from "@/components/formInputs/Inputs";
import { useT } from "@/assets/i18n";
import ProductService from "@/core/services/product.service";
import ToastService from "@/core/services/toast.service";
import { Skeleton } from "@/components/ui/skeleton";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate, useParams } from "react-router-dom";

const CreateProduct = () => {
	const t = useT();
	const productService = new ProductService();
	const routerParams = useParams();
	const id = routerParams.id;
	const [isSending, setIsSending] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [assets, setAssets] = useState<Array<IAsset | IAssetProductCreate>>([]);
	const [selectedImage, setSelectedImage] = useState<
		IAsset | IAssetProductCreate | null
	>(null);
	const [deletedAssets, setDeletedAssets] = useState<IAsset[]>([]);
	const [product, setProduct] = useState<IProduct>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		resetComponent();
		fetchProduct();
	}, [id]);

	const fetchProduct = async () => {
		if (!id) return;
		try {
			setIsLoading(true);
			const productResponse = await productService.getProductById(id);
			if (productResponse) {
				const fetchedProduct = productResponse.data;
				setProduct(fetchedProduct);
				setAssets(fetchedProduct.assets);
				setSelectedImage(fetchedProduct.assets[0] || null);
			}
		} catch (error) {
			ToastService.showError("Erro ao carregar o produto.");
		} finally {
			setIsLoading(false);
		}
	};

	const initialValues: IProductCreate = {
		name: product?.name || "",
		description: product?.description || "",
		price: product?.price || 0,
		assets: [],
	};

	const validationSchema = Yup.object({
		name: Yup.string().required(t("validation.nameRequired")),
		description: Yup.string().required(t("validation.descriptionRequired")),
		price: Yup.number().required(t("validation.priceRequired")),
		assets: Yup.array().of(
			Yup.object({
				type: Yup.string().required(t("validation.assetTypeRequired")),
				description: Yup.string().required(
					t("validation.assetDescriptionRequired")
				),
				base64Data: Yup.string().required(t("validation.assetBase64Required")),
			})
		),
	});

	const onSubmit = async (values: IProductCreate) => {
		setIsSending(true);
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("description", values.description);
		formData.append("price", String(values.price));

		assets.forEach((asset) => {
			if ("file" in asset) {
				formData.append("assets", asset.file);
				return;
			}
		});

		try {
			if (id) {
				const deletedAssetsIds: string[] = deletedAssets.map(
					(asset) => asset.id
				);
				const deletedAssetsIdsPayload: string =
					JSON.stringify(deletedAssetsIds);
				formData.append("deleteAssetsIds", deletedAssetsIdsPayload);
				const response = await productService.updateProduct(id, formData);
				if (response) {
					ToastService.showSuccess("Produto editado com sucesso", () =>
						fetchProduct()
					);
				}
			} else {
				const response = await productService.postProduct(formData);
				if (response) {
					ToastService.showSuccess("Produto criado com sucesso", () =>
						navigate("/managment")
					);
				}
			}
		} catch (err) {
			ToastService.showError(
				`Houve um problema ao ${
					id ? "editar" : "criar"
				} o seu produto, por favor, tente novamente`
			);
		} finally {
			setIsSending(false);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const newAssets = Array.from(files).map((file) => ({
				type: "image",
				description: file.name,
				file: file,
			}));
			setAssets([...assets, ...newAssets]);
			setSelectedImage(newAssets[0]);
		}
	};

	const getSelectedCardImage = () => {
		if (selectedImage) {
			if (isIAsset(selectedImage)) {
				return selectedImage.url;
			}
			return URL.createObjectURL(selectedImage.file);
		}
		return "https://salvus-image-database.s3.us-east-2.amazonaws.com/default.jpg";
	};

	const getCarousselImage = (asset: IAsset | IAssetProductCreate) => {
		if (isIAsset(asset)) {
			return asset.url;
		}
		return URL.createObjectURL(asset.file);
	};

	const deleteAsset = (index: number) => {
		const assetToDelete = assets[index];
		if ("id" in assetToDelete) {
			setDeletedAssets([...deletedAssets, assetToDelete]);
		}
		setAssets(assets.filter((_, i) => i !== index));
		const newAsset = assets.find((_, i) => i !== index);
		setSelectedImage(newAsset ? newAsset : null);
	};

	const isIAsset = (asset: IAsset | IAssetProductCreate): asset is IAsset => {
		return (asset as IAsset).id !== undefined;
	};

	const deleteProduct = async (id: string) => {
		setIsDeleting(true);
		try {
			const result = await productService.deleteProductById(id);
			if (result) {
				ToastService.showSuccess("Produto excluido com sucesso", () =>
					navigate("/managment")
				);
			}
		} catch (err) {
			ToastService.showError(`Erro ao excluir o produto: ${err}`);
			setIsDeleting(false);
		}
	};
	const LoadingComponent = () => {
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
	};

	const resetComponent = () => {
		setIsSending(false);
		setIsDeleting(false);
		setAssets([]);
		setSelectedImage(null);
		setDeletedAssets([]);
		setProduct(undefined);
		setIsLoading(false);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			{isLoading ? (
				LoadingComponent()
			) : (
				<>
					<div className="flex justify-between">
						<h1 className="text-3xl font-bold mb-6">
							{id
								? "Editar o meu produto"
								: t("application.pages.createProduct.title")}
							{}
						</h1>
						{id ? (
							<>
								<AlertDialog>
									<Button asChild variant={"destructive"} disabled={isDeleting}>
										<AlertDialogTrigger> Excluir produto</AlertDialogTrigger>
									</Button>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Tem certeza que deseja excluir o produto?
											</AlertDialogTitle>
											<AlertDialogDescription>
												Essa ação não poderá ser desfeita e você precisará
												novamente fazer a criação de um novo produto caso
												desejar.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												className="bg-destructive hover:bg-destructive/90"
												disabled={isDeleting}
												onClick={() => deleteProduct(id)}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col lg:flex-row lg:gap-20">
						<div className="w-full h-auto lg:w-[380px] lg:mx-0 mx-auto lg:min-w-[380px]">
							<Card className="aspect-video lg:aspect-square overflow-hidden object-cover ">
								<img
									src={getSelectedCardImage()}
									alt={t("application.pages.createProduct.imageAlt")}
									className="w-full h-full object-cover"
								/>
							</Card>
							<Carousel
								orientation="horizontal"
								opts={{
									loop: false,
								}}
							>
								<CarouselContent className="p-4">
									{assets.map(
										(asset: IAssetProductCreate | IAsset, index: number) => (
											<CarouselItem
												className="basis-auto relative"
												key={asset.description}
											>
												<img
													src={getCarousselImage(asset)}
													alt={asset.description}
													className={`rounded-lg cursor-pointer w-28 aspect-video object-cover hover:border hover:border-primary border`}
													onMouseEnter={() => setSelectedImage(asset)}
												/>
												<Button
													className="h-auto p-0 rounded-full bg-muted-foreground/70 hover:bg-muted-foreground/30 absolute top-1 right-1"
													onClick={() => {
														deleteAsset(index);
													}}
												>
													<XIcon />
												</Button>
											</CarouselItem>
										)
									)}
									<CarouselItem className="basis-auto">
										<label htmlFor="file-upload">
											<div className="bg-muted px-4 py-2 hover:bg-accent text-accent-foreground hover:text-gray-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer w-28 aspect-video object-contain hover:border hover:border-primary border">
												<PlusIcon strokeWidth={1} className="w-14 h-11" />
											</div>
										</label>
										<input
											type="file"
											id="file-upload"
											className="hidden"
											onChange={handleFileChange}
										/>
									</CarouselItem>
								</CarouselContent>
								<CarouselPrevious
									className={`${selectedImage ? "" : "hidden"}`}
								/>
								<CarouselNext className={`${selectedImage ? "" : "hidden"}`} />
							</Carousel>
						</div>
						<div className="w-full">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
								enableReinitialize={true}
							>
								<Form className="flex flex-col gap-4">
									<div>
										<Input
											control="name"
											placeholder={t(
												"application.pages.createProduct.form.nameInputPlaceholder"
											)}
											label={t(
												"application.pages.createProduct.form.nameInputLabel"
											)}
										/>
									</div>

									<div>
										<Input
											control="price"
											placeholder={t(
												"application.pages.createProduct.form.priceInputPlaceholder"
											)}
											type="number"
											label={t(
												"application.pages.createProduct.form.priceInputLabel"
											)}
										/>
									</div>
									<div>
										<Textarea
											control="description"
											placeholder={t(
												"application.pages.createProduct.form.descriptionInputPlaceholder"
											)}
											label={t(
												"application.pages.createProduct.form.descriptionInputLabel"
											)}
											rows={10}
										/>
									</div>

									<Button type="submit" disabled={isSending}>
										{isSending
											? "Enviando..."
											: id
											? "Editar produto"
											: t("application.pages.createProduct.form.submit")}
									</Button>
								</Form>
							</Formik>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CreateProduct;
