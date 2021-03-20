import * as core from "@actions/core";
import * as github from "@actions/github";
import { existsSync, readFileSync } from "fs";
import * as path from "path";
import axios from "axios";

import { getApps } from "./apps";
import { parseConfig, PathMaps } from "./config";
import { getChangedFiles, getCommitInfo } from "./git";

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
      handleCommit(github.context.sha, parseConfig(configText), apiKey);
    }
    console.log(`success`);
  } catch (error) {
    core.setFailed("failed :/");
  }
}

function handleCommit(sha: string, pathMap: PathMaps, apiKey: string) {
  const changedFiles = getChangedFiles(sha);
  const apps = getApps(pathMap, changedFiles);
  const commitInfo = getCommitInfo(sha);
  const payload = {
    id: sha,
    apps,
    author: commitInfo.author,
    message: commitInfo.message,
    timestamp: commitInfo.timestamp,
  };
  // TODO support prod/sandbox
  const url = "https://releaselog-3oaq5vxgca-uc.a.run.app/changes";
  const auth = { username: apiKey, password: "" };
  axios.post(url, payload, { auth });
}

main();
