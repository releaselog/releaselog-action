import * as core from '@actions/core';
import * as YAML from 'yaml';
import { existsSync, readFileSync } from "fs";
import * as path from "path";

async function main(): Promise<void> {
  try {
    const apiKey = core.getInput('api_key');
    if (!apiKey) {
      core.setFailed("please specify releaselog API key");
      return;
    }

    const configPath = path.join(process.env.GITHUB_WORKSPACE!, ".releaselog/config.yml");
    if (existsSync(configPath)) {
      // config file exists
      const config = YAML.parse(readFileSync(configPath, {encoding: 'utf8'}));
      const pathMap = config["path_mappings"];
      console.log(config);
      console.log(pathMap);
    }
    console.log(`Hello world!`);
  } catch (error) {
    core.setFailed("failed :/");
  }
}

main();
