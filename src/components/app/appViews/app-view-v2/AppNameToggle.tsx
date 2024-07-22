import AppData from "@/types/AppData";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export default function AppNameToggle({
	showMore,
	onElementClick,
    app,
}: {
	showMore: boolean,
	onElementClick: (event: any) => void,
    app: AppData;
}) {
    const arrowClasses = "mt-1 mr-2";
	
	return (
		
		<div className="flex flex-1">
			{showMore ? (
				<SlArrowUp
					className={arrowClasses}
					onClick={onElementClick}
				/>
			) : (
				<SlArrowDown
					className={arrowClasses}
					onClick={onElementClick}
				/>
			)}
			<h1
				className={`cursor-pointer`}
				onClick={onElementClick}
			>{app.name ? app.name : app.packageJson.name}</h1>
		</div>
	)
}
