export function useLocation(callback: PositionCallback, error: () => void) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(callback);
	} else {
		error()
	}
}