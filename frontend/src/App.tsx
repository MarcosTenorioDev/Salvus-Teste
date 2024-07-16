import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MyProducts from "./pages/managment/MyProducts/MyProducts";
import { LayoutAdmin } from "./layout/sidebarComponents";

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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
