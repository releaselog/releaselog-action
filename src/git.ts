import { execSync } from "child_process";

export function getChangedFiles(sha: string): string[] {
  const stdout = execSync(`git diff-tree --no-commit-id --name-only -r ${sha}`);
  return stdout.toString().split(/\r\n|\r|\n/);
}

interface ICommitInfo {
  author: {
    name: string;
    email: string;
  };
  message: string;
  timestamp: number;
}

export function getCommitInfo(sha: string): ICommitInfo {
  const options = ["%an", "%ae", "%s", "%ct"];
  const separator = "___releaselogapp___";
  const stdout = execSync(
    `git show -s --format='${options.join(separator)}' ${sha}`
  );
  const data = stdout.toString().split(separator);
  if (data.length < 4) {
    throw Error(`unexepcted output from git show: ${stdout}`);
  }
  return {
    author: {
      name: data[0],
      email: data[1],
    },
    message: data[2],
    timestamp: parseInt(data[3], 10),
  };
}
