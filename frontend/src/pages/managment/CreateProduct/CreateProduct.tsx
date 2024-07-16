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
import {  Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input, Textarea } from "@/components/formInputs/Inputs";

const CreateProduct = () => {
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
		name: Yup.string().required("Nome do produto é obrigatório"),
		description: Yup.string().required("Descrição do produto é obrigatória"),
		price: Yup.number().required("Valor do produto é obrigatório"),
		assets: Yup.array().of(
			Yup.object({
				type: Yup.string().required("URL da imagem é obrigatória"),
				description: Yup.string().required("Descrição da imagem é obrigatória"),
				base64Data: Yup.string().required("Base64 é obrigatório"),
			})
		),
	});

	const onSubmit = (values: any) => {
		console.log(values);
        console.log(assets)
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (reader.result) {
					const base64Data = reader.result.toString();
					const newAsset: IAssetProductCreate = {
						type: "image",
						description: file.name,
						base64Data: base64Data,
					};
					setAssets([...assets, newAsset]);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Criar Novo Produto</h1>
			<div className="lg:flex gap-20">
				<div className="w-full h-auto md:w-[600px] lg:w-[380px] md:h-[380px] lg:mx-0 mx-auto lg:min-w-[380px] md:mb-14">
					<Card className="aspect-video lg:aspect-square">
						<img
							src={
								selectedImage?.base64Data ||
								"https://salvus-image-database.s3.us-east-2.amazonaws.com/default.jpg"
							}
							alt="Imagem do produto"
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
										src={asset.base64Data}
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
									placeholder="insira o nome do produto"
									label="Nome do produto"
								/>
							</div>

							<div>
								<Input
									control="price"
									placeholder="insira o preço"
									type="number"
									label="Preço do produto"
								/>
							</div>
							<div>
								<Textarea
									control="description"
									placeholder="insira a descrição do produto"
									label="Descrição do produto"
									rows={10}
								/>
							</div>

							<Button type="submit">Publicar produto</Button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
