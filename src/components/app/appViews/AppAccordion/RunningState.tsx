
/**
 * Show running state
 */
export default function RunningState({
	isRunning,
}: {
	isRunning: boolean
}) {
	return (
		<div className="ml-auto flex-1">
			{isRunning ? (
				<span className="text-green-500">
					<strong>Running</strong>
				</span>
			) : (
				<span className="text-gray-500">
					Not running
				</span>
			)}
		</div>
	);
}
