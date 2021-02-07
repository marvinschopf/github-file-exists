import * as https from "https";

export default async function existsAsync(
	owner: string,
	repo: string,
	path: string
): Promise<boolean> {
	return await performRequest(buildRequest(owner, repo, path));
}

function buildRequest(
	owner: string,
	repo: string,
	path: string
): https.RequestOptions {
	return {
		hostname: "api.github.com",
		port: 443,
		path: `/repos/${owner}/${repo}/contents/${path}`,
		headers: {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "github-file-exists"
		},
	};
}

function performRequest(options: https.RequestOptions): Promise<boolean> {
	return new Promise((resolve, reject) => {
		https
			.request(options, function (response) {
				const { statusCode, headers } = response;
				if (statusCode !== 200) {
					resolve(false);
				}
				const chunks = [];
				response.on("data", (chunk) => {
					chunks.push(chunk);
				});
				response.on("end", () => {
					resolve(true);
				});
			})
			.end();
	});
}
