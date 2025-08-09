import dotnevx from "@dotenvx/dotenvx";

export function flattenInput(
	input: Record<string, string | number | {}>,
): Record<string, string> {
	const result: Record<string, string> = {};

	function flatten(obj: Record<string, any>, prefix = "") {
		for (const key in obj) {
			const newKey = prefix 
				? `${prefix.toUpperCase()}_${key.toUpperCase()}`
				: key.toUpperCase();
			if (typeof obj[key] === "object" && obj[key] !== null) {
				flatten(obj[key], newKey);
			} else {
				result[newKey] = String(obj[key]);
			}
		}
	}

	flatten(input);
	return result;
}

export function applyEnvVars(
	envList: Record<string, string>,
	targetPath: string,
): void {
	for (const [key, value] of Object.entries(envList)) {
		dotnevx.set(key, value, { path: targetPath });
	}
}
