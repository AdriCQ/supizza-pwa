export const useStorage = <T = unknown>(key: string) => ({
	get: () => {
		const data = localStorage.getItem(`${window.location.host}/${key}`);
		return data ? JSON.parse(data) as T : null;
	},
	set: (data: T) => localStorage.setItem(`${window.location.host}/${key}`, JSON.stringify(data)),
	remove: () => localStorage.removeItem(`${window.location.host}/${key}`)
});