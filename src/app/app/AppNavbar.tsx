import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

/**
 * App navbar
 */
export default function AppNavbar() {
	const sites = [{
		displayName: "Apps",
		href: "/app"
	}, {
		displayName: "Groups",
		href: "/app/groups"
	}, {
		displayName: "Process",
		href: "/app/process"
	}];
	
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				{/* Pages */}
				<ul className="flex lg:flex gap-4 justify-start ml-2">
					{sites.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium",
								)}
								color="foreground"
								href={item.href}
							>
								{item.displayName}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>
		</NextUINavbar>
	);
}
