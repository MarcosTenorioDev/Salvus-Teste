import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SideNav } from "@/layout/sidebarComponents/Sidenav";
import { NavItems } from "@/components/constants/adminNavItems";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useT } from "@/assets/i18n";

export const MobileSidebar = () => {
	const [open, setOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const navigate = useNavigate()
	const t = useT()

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<div className="w-full flex items-center justify-between gap-2">
						<MenuIcon className="cursor-pointer" />
						<h1 className="text-lg font-semibold">{t("application.pages.managment.title")}</h1>
					</div>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-72 flex flex-col justify-between"
				>
					<div>
						<div className="text-center">
							<h2
								className={`text-primary font-bold text-2xl text-nowrap
								`}
							>
								{t("application.global.applicationName")}
							</h2>
						</div>
						<div className=" flex justify-center mt-6 border-b-2 pb-6">
							<UserButton showName={true} />
						</div>
						<div className="px-1 py-6 ">
							<SideNav items={NavItems} setOpen={setOpen} />
						</div>
					</div>

					<div className="flex flex-col w-full gap-6">
						<Button
							variant={"outline"}
							className="w-full text-primary border-primary hover:text-primary"
							onClick={() => navigate('/')}
						>
							{t("application.components.navbar.salesPage")}
						</Button>
						<SignOutButton>
							<Button variant={"default"} className="w-full">
							{t("application.components.navbar.logout")}
							</Button>
						</SignOutButton>
						<p className="text-sm font-semibold text-center text-gray-400">
							<span>© {t("application.global.applicationName")} {new Date().getFullYear()}</span>
						</p>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};
