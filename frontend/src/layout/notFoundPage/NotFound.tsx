import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex items-start justify-center h-screen p-4 mb-20">
			<div className="text-center">
				<img
					src="https://salvus-image-database.s3.us-east-2.amazonaws.com/404.jpg"
					alt="404"
					className="max-w-full h-auto mb-4 max-h-[380px] mx-auto"
				/>
				<h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
				<p className="text-2xl text-gray-600">
					Oops... a página que você busca não existe!
				</p>
				<p className="text-2xl text-gray-600 mb-8">
					que tal retornar para a nossa página inicial e ver os nossos produtos?
				</p>
				<Button asChild variant={"default"}>
					<Link to={"/"}>Voltar para a página inicial</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
