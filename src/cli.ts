#!/usr/bin/env node

import { Command } from "commander";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { applyEnvVars, flattenInput } from "./helpers";
import { readFile } from "node:fs/promises";

const program = new Command();

const DEFAULT_INPUT_FILE = "./env.json";
const DEFAULT_TARGET_FILE = "./.env.production";

program
	.name("dotx")
	.description("Interactive CLI that uses dotenvx to set env variables")
	.version("0.1.0")
	.showHelpAfterError()
	.option(
		"-i, --input <path>",
		`path to your environment variables => default: ${DEFAULT_INPUT_FILE}`,
		DEFAULT_INPUT_FILE,
	)
	.option(
		"-o, --output <path>",
		`path to your target env file => default: ${DEFAULT_TARGET_FILE}`,
		DEFAULT_TARGET_FILE,
	);

program.parse(process.argv);

program.exitOverride((err) => {
	console.error(err.message);
	program.outputHelp();
	process.exit(1);
});

const opts = program.opts();
const inputPath = resolve(process.cwd(), opts.input);
const outputPath = resolve(process.cwd(), opts.output);

if (!existsSync(inputPath)) {
	console.error("Input file does not exist:", inputPath);
	program.outputHelp();
	process.exit(1);
}
if (!existsSync(outputPath)) {
	console.error("target env file does not exist:", outputPath);
	program.outputHelp();
	process.exit(1);
}


const inputJson = JSON.parse(await readFile(inputPath, 'utf8'))
const envList = flattenInput(inputJson);


applyEnvVars(envList , outputPath)
