<div align="center">
  <img src="assets/dotxx.png" alt="dotxx" width="200" height="200">
</div>

# dotxx

`dotxx` is a tiny CLI that makes it easy to set environment variables from a JSON file into an existing `.env`-style file using the `@dotenvx/dotenvx` API.

---

## Features

* Read a structured JSON file and flatten nested keys into `UPPER_SNAKE_CASE` environment names.
* Use `@dotenvx/dotenvx` to add/update each variable in a target env file.
* Simple CLI with configurable input and output paths.
* Helpful error messages when files are missing.

---

## Install

Install globally so the `dotx` command is available system-wide:

```bash
npm install -g dotxx
# or
yarn global add dotxx
```

Or install as a project dependency and use with `npx`:

```bash
# install locally
npm install --save-dev dotxx
# run
npx dotxx
```

> After installing globally, users can simply run `dotx`.

---

## Usage

Default behavior (uses `./env.json` → `./.env.production`):

```bash
dotx
```

Custom input/output:

```bash
dotx -i ./configs/env.json -o ./deploy/.env.production
# or
dotx --input ./my-env.json --output ./.env.staging
```

CLI options:

* `-i, --input <path>` — path to JSON input file (default: `./env.json`)
* `-o, --output <path>` — path to target env file (default: `./.env.production`)
* `-V, --version` — show version
* `-h, --help` — show help

**Behavior:** The CLI checks that both input and target files exist. If either is missing it prints an error, shows help, and exits with a nonzero code.

---

## Input format

`env.json` can contain nested objects. Example:

```json
{
  "app": { "name": "my-app", "port": 3000 },
  "db": {
    "host": "localhost",
    "port": 5432,
    "credentials": { "user": "postgres", "pass": "secret" }
  },
  "featureFlag": true,
  "timeout": 30
}
```

### Flattening rules

* Keys are uppercased.
* Nested keys are concatenated with `_`.
* Values are stringified.

From the example, `flattenInput` produces:

```
APP_NAME=my-app
APP_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_CREDENTIALS_USER=postgres
DB_CREDENTIALS_PASS=secret
FEATUREFLAG=true
TIMEOUT=30
```

---

