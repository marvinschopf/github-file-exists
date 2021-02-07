import fetch from "node-fetch";

export default async function exists(
	owner: string,
	repo: string,
	path: string
): Promise<boolean> {
	return (
		await fetch(
			`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
					"User-Agent": "github-file-exists",
				},
			}
		)
	).status === 200
		? true
		: false;
}
