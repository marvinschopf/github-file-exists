/**
 * github-file-exists
 * Copyright (c) 2021 Marvin Schopf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright 2021 Marvin Schopf
 * @license Apache-2.0
 *
 */

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
	if (apiKey != null && apiKey.length >= 1) {
		headers["Authorization"] = `token ${apiKey}`;
	}
	const response: Response = await fetch(
		`https://api.github.com/repos/${owner.replace(
			/\/|\\/gm,
			""
		)}/${repo.replace(/\/|\\/gm, "")}/contents/${path}`,
		{
			headers: headers,
		}
	);
	const responseJson = await response.json();
	if (response.status != 200 && response.status != 404) {
		if (responseJson.message) {
			throw new Error(`Error: ${responseJson.message}`);
		} else {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}
	}
	return response.status === 200 ? true : false;
}
