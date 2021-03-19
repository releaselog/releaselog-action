import * as core from "@actions/core";
import * as github from "@actions/github";
import { existsSync, readFileSync } from "fs";
import * as path from "path";
import { execSync } from "child_process";

import { getApps } from "./apps";
import { parseConfig, PathMaps } from "./config";

async function main(): Promise<void> {
  try {
    const apiKey = core.getInput("api_key");
    if (!apiKey) {
      core.setFailed("please specify releaselog API key");
      return;
    }

    const configPath = path.join(
      process.env.GITHUB_WORKSPACE!,
      ".releaselog/config.yml"
    );
    if (existsSync(configPath)) {
      const configText = readFileSync(configPath, { encoding: "utf8" });

      // TODO support multiple commits
      handleCommit(github.context.sha, parseConfig(configText));
    }
    console.log(`Hello world!`);
  } catch (error) {
    core.setFailed("failed :/");
  }
}

function handleCommit(sha: string, pathMap: PathMaps) {
  const stdout = execSync(`git diff-tree --no-commit-id --name-only -r ${sha}`);
  const changedFiles = stdout.toString().split(/\r\n|\r|\n/);

  const apps = getApps(pathMap, changedFiles);

  // TODO notify releaselog API with apps
}

main();
