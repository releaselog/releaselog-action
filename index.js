const core = require('@actions/core');

try {
  const apiKey = core.getInput('api_key');
  console.log(`Hello ${apiKey.length}!`);
} catch (error) {
  core.setFailed("failed :/");
}
