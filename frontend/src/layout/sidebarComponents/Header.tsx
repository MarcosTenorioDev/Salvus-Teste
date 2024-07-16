import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/layout/sidebarComponents/Mobile-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import { useT } from "@/assets/i18n";

export default function Header() {
	const navigate = useNavigate();
	const t = useT()
	return (
		<div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
			<nav className="flex h-16 items-center justify-between px-10">
				<Link
					to={"/managment"}
					className="hidden items-center justify-between gap-2 md:flex"
				>
					<h1 className="text-lg font-semibold">{t("application.components.sidebar.header.title")}</h1>
				</Link>
				<div className={cn("md:!hidden w-full flex")}>
					<MobileSidebar />
				</div>
				<div className="flex items-center justify-center gap-10">
					<Button
						variant={"link"}
						className="hidden items-center justify-between gap-2 md:flex text-primary"
						onClick={() => navigate("/")}
					>
						<h1 className="text-md font-semibold">{t("application.components.navbar.salesPage")}</h1>
					</Button>
					<div className="hidden md:block">
						<UserButton />
					</div>
				</div>
			</nav>
		</div>
	);
}
