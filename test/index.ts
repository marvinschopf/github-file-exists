import { randomBytes } from "crypto";
import test from "ava";
import exists from "./../src/index";

test("v8/v8/.gitignore", async function (t) {
	t.is(await exists("v8", "v8", ".gitignore", process.env.GITHUB_TOKEN), true);
});

test("v8/v8/{random}", async function (t) {
	t.is(
		await exists(
			"v8",
			"v8",
			randomBytes(36).toString("hex"),
			process.env.GITHUB_TOKEN
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
			process.env.GITHUB_TOKEN
		),
		false
	);
});

test("/v8//v8//.gitignore/", async function (t) {
	t.is(
		await exists("/v8/", "/v8/", "/.gitignore/", process.env.GITHUB_TOKEN),
		true
	);
});

test("Jetbrains/swot/lib/domains", async function (t) {
	t.is(
		await exists("Jetbrains", "swot", "lib/domains", process.env.GITHUB_TOKEN),
		true
	);
});

test("Jetbrains/swot/lib/domains/net/eichendorffschule.txt", async function (t) {
	t.is(
		await exists("Jetbrains", "swot", "lib/domains/net/eichendorffschule.txt"),
		true
	);
});

test("Jetbrains/swot/lib/domains_", async function (t) {
	t.is(await exists("Jetbrains", "swot", "lib/domains_"), false);
});
