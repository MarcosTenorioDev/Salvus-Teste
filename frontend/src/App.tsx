import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MyProducts from "./pages/managment/MyProducts/MyProducts";
import { LayoutAdmin } from "./layout/sidebarComponents";
import ProductPage from "./pages/product/ProductPage";
import CreateProduct from "./pages/managment/CreateProduct/CreateProduct";
import NotFound from "./layout/notFoundPage/NotFound";

function App() {
	function UserLayout({ children }: any) {
		return (
			<>
				<Navbar />
				{children}
			</>
		);
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<UserLayout>
								<Home />
							</UserLayout>
						}
					/>
					<Route
						path="/managment"
						element={
							<LayoutAdmin>
								<MyProducts />
							</LayoutAdmin>
						}
					/>
					<Route
						path="/managment/createProduct"
						element={
							<LayoutAdmin>
								<CreateProduct />
							</LayoutAdmin>
						}
					/>
					<Route
						path="/product/:id"
						element={
							<UserLayout>
								<ProductPage />
							</UserLayout>
						}
					/>
					<Route
						path="managment/product/:id"
						element={
							<LayoutAdmin>
								<CreateProduct />
							</LayoutAdmin>
						}
					/>
					<Route
						path="*"
						element={
							<UserLayout>
								<NotFound />
							</UserLayout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
