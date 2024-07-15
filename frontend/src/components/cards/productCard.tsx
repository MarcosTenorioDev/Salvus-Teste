import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useT } from "@/assets/i18n";

const ProductCard = (props: {
	id: string;
	img: string;
	title: string;
	price: number;
	description: string;
}) => {
	const { img, title, price, description, id } = props;
	const navigate = useNavigate();
	const t = useT();

	return (
		<>
			<Card
				className="max-w-[280px] drop-shadow-md border rounded-lg overflow-hidden bg-white cursor-pointer transition-transform duration-300 transform-gpu hover:scale-110"
				onClick={() => navigate(`/product/${id}`)}
			>
				<CardContent className="p-0 h-48 overflow-hidden">
					<div className="w-full h-full bg-no-repeat bg-cover bg-center relative">
						<img
							src={img}
							alt={title}
							className="w-full h-full object-cover transition-transform duration-300 transform-gpu hover:scale-110"
						/>
					</div>
				</CardContent>
				<CardFooter className="p-4 flex flex-col items-start text-black">
					<p className="text-lg font-semibold mb-1 truncate">{title}</p>
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
