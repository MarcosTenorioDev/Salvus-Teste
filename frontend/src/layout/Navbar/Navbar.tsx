import {
	SignedOut,
	SignedIn,
	SignInButton,
	SignUpButton,
	SignOutButton,
	UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useT } from "../../assets/i18n";

const Navbar = () => {
	const t = useT();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<SignedIn>
				<nav className="relative px-4 py-4 flex justify-between items-center bg-primary">
					<div className="flex sm:max-w-7xl w-full justify-between items-center mx-auto">
						<Link
							to={"/"}
							className="font-primary text-white text-2xl font-normal"
						>
							{t("application.global.applicationName")}
						</Link>
						<div className={`lg:hidden`}>
							<Hamburger
								toggled={isMenuOpen}
								toggle={toggleMenu}
								color="white"
							/>
						</div>
						<nav className="flex-1 px-10 justify-end gap-8 hidden lg:flex">
							<Link
								className="font-primary h-9 px-4 py-2 text-secondary underline-offset-4 hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								to={"/managment"}
							>
								{t("application.components.navbar.myProducts")}
							</Link>
						</nav>
						<div className="hidden lg:flex">
							<UserButton />
						</div>
					</div>
				</nav>
				<div
					className={`fixed inset-0 bg-gray-800 transition-opacity duration-300 ease-in-out z-40 ${
						isMenuOpen ? "opacity-25" : "opacity-0 pointer-events-none"
					}`}
					onClick={toggleMenu}
				></div>
				<div
					className={`fixed top-0 flex flex-col justify-between z-40 right-0 bottom-0 w-4/6 max-w-[300px] py-6 px-6 bg-white border-r overflow-y-auto transform transition-transform duration-300 ease-in-out ${
						isMenuOpen
							? "translate-x-0 opacity-100"
							: "translate-x-full opacity-0"
					}`}
				>
					<div className="">
						<div className="flex items-center justify-between w-full">
							{t("application.global.applicationName")}
							<Cross2Icon
								className="h-10 w-10 text-red-600 font-bold cursor-pointer"
								onClick={toggleMenu}
							/>
						</div>

						<div className="flex items-center flex-col mb-8 mt-4">
							<UserButton showName={true} />
						</div>
						<nav className="flex flex-col gap-5">
							<Link to={"/managment"}>
								<Button variant={"default"} className="w-full">
									{t("application.components.navbar.myProducts")}
								</Button>
							</Link>
						</nav>
					</div>
					<div className="">
						<div className="mt-auto">
							<div className="pt-6">
								<SignOutButton>
									<Button variant={"default"} className="w-full">
										{t("application.components.navbar.logout")}
									</Button>
								</SignOutButton>
							</div>
							<p className="mt-4 text-sm font-semibold text-center text-gray-400">
								<span>© {t("application.global.applicationName")} {new Date().getFullYear()}</span>
							</p>
						</div>
					</div>
				</div>
			</SignedIn>

			<SignedOut>
				<nav className="relative px-4 py-4 flex justify-between items-center bg-primary">
					<div className="flex sm:max-w-7xl w-full justify-between items-center mx-auto">
						<Link
							to={"/"}
							className="font-primary text-white text-2xl font-normal"
						>
							{t("application.global.applicationName")}
						</Link>
						<div className={`sm:hidden`}>
							<Hamburger
								toggled={isMenuOpen}
								toggle={toggleMenu}
								color="white"
							/>
						</div>
						<nav className="px-3 flex-1 w-full justify-end gap-8 hidden sm:flex">
							<div className="text-white font-primary">
								<div className="h-9 px-4 py-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
									<SignInButton mode="modal">
										{t("application.components.navbar.login")}
									</SignInButton>
								</div>
							</div>
							<div className="text-white font-primary">
								<div className="h-9 px-4 py-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
									<SignUpButton mode="modal">
										{t("application.components.navbar.register")}
									</SignUpButton>
								</div>
							</div>
						</nav>
						<div className="hidden lg:flex">
							<UserButton />
						</div>
					</div>
				</nav>
				<div
					className={`fixed inset-0 bg-gray-800 transition-opacity duration-300 ease-in-out z-[9] ${
						isMenuOpen ? "opacity-25" : "opacity-0 pointer-events-none"
					}`}
					onClick={toggleMenu}
				></div>
				<div
					className={`fixed top-0 flex flex-col justify-between z-40 right-0 bottom-0 w-4/6 max-w-[300px] py-6 px-6 bg-white border-r overflow-y-auto transform transition-transform duration-300 ease-in-out ${
						isMenuOpen
							? "translate-x-0 opacity-100"
							: "translate-x-full opacity-0"
					}`}
				>
					<div>
						<div className="flex items-center justify-between w-full font-primary">
							{t("application.global.applicationName")}
							<Cross2Icon
								className="h-10 w-10 text-red-600 font-bold cursor-pointer"
								onClick={toggleMenu}
							/>
						</div>
						<div className="pb-12 flex flex-col justify-between">
							<nav className="flex flex-col">
								<div className="flex flex-col gap-3 mt-8">
									<div className="text-white font-primary">
										<SignInButton mode="modal">
											<div className="h-9 px-4 cursor-pointer w-full py-2 bg-primary text-white shadow-sm hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
												{t("application.components.navbar.login")}
											</div>
										</SignInButton>
									</div>
									<div className="text-white font-primary">
										<SignUpButton mode="modal">
											<div className="h-9 cursor-pointer px-4 w-full py-2 bg-primary text-white shadow-sm hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
												{t("application.components.navbar.register")}
											</div>
										</SignUpButton>
									</div>
								</div>
							</nav>
						</div>
					</div>
					<div className="mt-auto">
						<p className="text-sm font-semibold text-center text-gray-400">
							<span>© Med+ {new Date().getFullYear()}</span>
						</p>
					</div>
				</div>
			</SignedOut>
		</>
	);
};

export default Navbar;
