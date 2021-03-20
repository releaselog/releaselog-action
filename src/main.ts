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
    let pathMaps: PathMaps | undefined = undefined;
    if (existsSync(configPath)) {
      const configText = readFileSync(configPath, { encoding: "utf8" });
      pathMaps = parseConfig(configText);
    }
    // TODO support multiple commits
    await handleCommit(
      github.context.sha,
      pathMaps,
      apiKey,
      github.context.repo.repo
    );
    console.log(`success`);
  } catch (error) {
    core.setFailed("failed :/");
  }
}

async function handleCommit(
  sha: string,
  pathMaps: PathMaps | undefined,
  apiKey: string,
  repoName: string
) {
  const changedFiles = getChangedFiles(sha);
  const apps = pathMaps ? getApps(pathMaps, changedFiles) : [repoName];
  const commitInfo = getCommitInfo(sha);
  if (apps.length === 0) {
    console.log(`nothing to notify about ${sha} ${commitInfo.message}`);
  }
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
  await axios.post(url, payload, { auth });
  console.log(
    `successfully updated releaselog app about  ${sha} ${commitInfo.message}`
  );
}

main();
