import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";
import Home from "./pages/Home/Home";

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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
