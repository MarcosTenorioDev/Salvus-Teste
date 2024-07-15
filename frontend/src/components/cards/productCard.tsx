import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useT } from "@/assets/i18n";
import { IProduct } from "@/core/interfaces/product.interface";

const ProductCard = (props: IProduct) => {
	const { price, description, id, assets, name } = props;
	const navigate = useNavigate();
	const t = useT();

	return (
		<>
			<Card
				className="w-full drop-shadow-md border rounded-lg overflow-hidden bg-white cursor-pointer transition-transform duration-300 transform-gpu hover:scale-110"
				onClick={() => navigate(`/product/${id}`)}
			>
				<CardContent className="p-0 h-48 overflow-hidden">
					<div className="w-full h-full bg-no-repeat bg-cover bg-center relative">
						<img
							src={
								assets.length
									? assets[0].url
									: "https://salvus-image-database.s3.us-east-2.amazonaws.com/default.jpg"
							}
							alt={assets.length ? assets[0].description : "Imagem do produto"}
							className="w-full h-full object-cover transition-transform duration-300 transform-gpu hover:scale-110"
						/>
					</div>
				</CardContent>
				<CardFooter className="p-4 flex flex-col items-start text-black">
					<p className="text-lg font-semibold mb-1 truncate">{name}</p>
					<p className="text-sm text-gray-600 mb-2 truncate w-full">
						{description}
					</p>
					<p className="text-lg font-medium text-green-600">
						{t("application.global.currencyPrefix")} {price.toFixed(2)}
					</p>
				</CardFooter>
			</Card>
		</>
	);
};

export default ProductCard;
