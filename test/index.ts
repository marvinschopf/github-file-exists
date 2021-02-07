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

import { randomBytes } from "crypto";
import test from "ava";
import exists from "./../src/index";

test("v8/v8/.gitignore", async function (t) {
	t.is(await exists("v8", "v8", ".gitignore", process.env.GH_TOKEN), true);
});

test("v8/v8/{random}", async function (t) {
	t.is(
		await exists(
			"v8",
			"v8",
			randomBytes(36).toString("hex"),
			process.env.GH_TOKEN
		),
		false
	);
});

test("{random}/{random}/{random}", async function (t) {
	t.is(
		await exists(
			randomBytes(36).toString("hex"),
			randomBytes(36).toString("hex"),
			randomBytes(36).toString("hex"),
			process.env.GH_TOKEN
		),
		false
	);
});

test("/v8//v8//.gitignore/", async function (t) {
	t.is(
		await exists("/v8/", "/v8/", "/.gitignore/", process.env.GH_TOKEN),
		true
	);
});

test("Jetbrains/swot/lib/domains", async function (t) {
	t.is(
		await exists("Jetbrains", "swot", "lib/domains", process.env.GH_TOKEN),
		true
	);
});

test("Jetbrains/swot/lib/domains/net/eichendorffschule.txt", async function (t) {
	t.is(
		await exists(
			"Jetbrains",
			"swot",
			"lib/domains/net/eichendorffschule.txt",
			process.env.GH_TOKEN
		),
		true
	);
});

test("Jetbrains/swot/lib/domains_", async function (t) {
	t.is(
		await exists("Jetbrains", "swot", "lib/domains_", process.env.GH_TOKEN),
		false
	);
});
