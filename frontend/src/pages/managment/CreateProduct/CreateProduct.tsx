import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { IAssetProductCreate } from "@/core/interfaces/asset.interface";
import { IProductCreate } from "@/core/interfaces/product.interface";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input, Textarea } from "@/components/formInputs/Inputs";
import { useT } from "@/assets/i18n";
import ProductService from "@/core/services/product.service";
import ToastService from "@/core/services/toast.service";

const CreateProduct = () => {
	const t = useT();
	const productService = new ProductService();
	const [isSending, setIsSending] = useState<boolean>(false);
	const [assets, setAssets] = useState<IAssetProductCreate[]>([]);
	const [selectedImage, setSelectedImage] =
		useState<IAssetProductCreate | null>(null);

	const initialValues: IProductCreate = {
		name: "",
		description: "",
		price: 0,
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
			formData.append(`assets`, asset.file);
		});

		try {
			const response = await productService.postProduct(formData);
			if (response) {
				ToastService.showSuccess("Produto criado com sucesso");
			}
		} catch (err) {
			ToastService.showError("Deu erro");
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
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">
				{t("application.pages.createProduct.title")}
			</h1>
			<div className="lg:flex gap-20">
				<div className="w-full h-auto md:w-[600px] lg:w-[380px] md:h-[380px] lg:mx-0 mx-auto lg:min-w-[380px] md:mb-14">
					<Card className="aspect-video lg:aspect-square">
						<img
							src={
								selectedImage?.file
									? URL.createObjectURL(selectedImage.file)
									: "https://salvus-image-database.s3.us-east-2.amazonaws.com/default.jpg"
							}
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
							{assets.map((asset: IAssetProductCreate) => (
								<CarouselItem className="basis-auto" key={asset.description}>
									<img
										src={URL.createObjectURL(asset.file)}
										alt={asset.description}
										className={`rounded-lg cursor-pointer w-28 aspect-video object-contain hover:border hover:border-primary border`}
										onMouseEnter={() => setSelectedImage(asset)}
									/>
								</CarouselItem>
							))}
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
						<CarouselPrevious className={`${selectedImage ? "" : "hidden"}`} />
						<CarouselNext className={`${selectedImage ? "" : "hidden"}`} />
					</Carousel>
				</div>
				<div className="w-full">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
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
									: t("application.pages.createProduct.form.submit")}
							</Button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
