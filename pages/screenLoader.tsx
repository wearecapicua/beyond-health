export const ScreenLoader = ({ active }: { active: boolean }) => {
	if (!active) return null

	return (
		<div className="fixed inset-0 z-[9999] grid place-items-center bg-black/40 backdrop-blur-sm">
			<div className="h-12 w-12 animate-spin rounded-full border-4 border-white/50 border-t-white" />
		</div>
	)
}
