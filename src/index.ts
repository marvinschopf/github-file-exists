import fetch from "node-fetch";

export default async function exists(
	owner: string,
	repo: string,
	path: string,
	apiKey?: string
): Promise<boolean> {
	let headers = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "github-file-exists",
	};
	if (apiKey) {
		headers["Authorization"] = `token ${apiKey ? apiKey : ""}`;
	}
	const response: Response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
		{
			headers: headers,
		}
	);
	const responseJson = await response.json();
	if (response.status != 200 && response.status != 400) {
		if (responseJson.message) {
			throw new Error(`Error: ${responseJson.message}`);
		} else {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}
	}
	return response.status === 200 ? true : false;
}
