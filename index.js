const core = require('@actions/core');
const YAML = require('yaml');
const fs = require("fs");
const path = require('path');

try {
  const apiKey = core.getInput('api_key');
  if (!apiKey) {
    core.setFailed("please specify releaselog API key");
    return;
  }

  const configPath = path.join(process.env.GITHUB_WORKSPACE, ".releaselog/config.yml");
  if (fs.existsSync(configPath)) {
    // config file exists
    const config = YAML.parse(fs.readFileSync(configPath, {encoding: 'utf8'}));
    const pathMap = config["path_mappings"];
    console.log(config);
    console.log(pathMap);
  }
  console.log(`Hello world!`);
} catch (error) {
  core.setFailed("failed :/");
}
