import { PathMaps } from "./config";

export function getApps(pathMaps: PathMaps, files: string[]): string[] {
  const apps: Set<string> = new Set();
  files.forEach((f) => {
    addAll(apps, getAppsForFile(pathMaps, f));
  });
  return [...apps];
}

function getAppsForFile(pathMaps: PathMaps, f: string) {
  const apps: Set<string> = new Set();
  pathMaps.forEach((map) => {
    if (map.regex.test(f)) {
      addAll(apps, map.apps);
    }
  });
  return apps;
}

function addAll(set: Set<string>, strs: string[] | Set<string>) {
  strs.forEach((s: string) => set.add(s));
}
