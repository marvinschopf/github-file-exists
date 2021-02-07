# github-file-exists

A simple package to check if a GitHub repository contains a certain file.

## Installation

Using `npm`:

```bash
npm install github-file-exists
```

Using `yarn`:

```bash
yarn add github-file-exists
```

## Usage

Using promises:

```javascript
const githubFileExists = require("github-file-exists").default;

githubFileExists("marvinschopf", "file-exists", ".gitignore").then(
	(fileExists) => {
		if (fileExists) {
			console.log("File exists!");
		} else {
			console.log("File does not exist!");
		}
	}
);
```

Using `async / await`:

```javascript
const githubFileExists = require("github-file-exists").default;

const fileExists = await githubFileExists(
	"marvinschopf",
	"file-exists",
	".gitignore"
);
if (fileExists) {
	console.log("File exists!");
} else {
	console.log("File does not exist!");
}
```

Using ES6 `import`:

```javascript
import { exists } from "github-file-exists";

const fileExists = await exists("marvinschopf", "file-exists", ".gitignore");

if (fileExists) {
	console.log("File exists!");
} else {
	console.log("File does not exist!");
}
```

### License

Copyright (c) 2021 Marvin Schopf  

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at  

    http://www.apache.org/licenses/LICENSE-2.0  

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.  
