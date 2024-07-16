import ProductCard from "@/components/cards/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/core/interfaces/product.interface";
import ProductService from "@/core/services/product.service";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon, SearchIcon } from "lucide-react";
import { useT } from "@/assets/i18n";

const Managment = () => {
    const productsService = new ProductService();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>("");
	const t = useT()

    useEffect(() => {
        getMyProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [filter, products]);

    async function getMyProducts() {
        const response = await productsService.getMyProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
    }

    function filterProducts() {
        if (filter === "") {
            setFilteredProducts(products);
        } else {
            const lowercasedFilter = filter.toLowerCase();
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(lowercasedFilter) ||
				product.description.toLowerCase().includes(lowercasedFilter)
            );
            setFilteredProducts(filtered);
        }
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
        <>
            <div className="max-w-7xl mx-auto px-4">
				<h1 className="text-4xl font-semibold my-10 mt-16 ml-12">Meus produtos</h1>
                <div className="relative flex w-full max-w-lg mx-auto items-center space-x-2">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 ml-2" />
                    <Input
                        placeholder={t("application.pages.homepage.searchInputPlaceholder")}
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                        className="w-full py-2 pl-10 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {filter && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900"
                            onClick={() => setFilter("")}
                        >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Clear</span>
                        </Button>
                    )}
                </div>
                {isLoading ? (
                    <LoadingComponent />
                ) : (
                    <>
                        <main className="flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 py-8 px-2 md:py-12 lg:px-14">
                            {filteredProducts.map((product: IProduct) => (
                                <ProductCard
                                    assets={product.assets}
                                    description={product.description}
                                    name={product.name}
                                    id={product.id}
                                    price={product.price}
                                    key={product.id}
                                    navigateTo={`/managment/product/${product.id}`}
                                />
                            ))}
                        </main>
                    </>
                )}
            </div>
        </>
    );
};

export default Managment;
