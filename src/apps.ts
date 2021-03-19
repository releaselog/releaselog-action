import { PathMaps } from "./config";

export function getApps(pathMaps: PathMaps, files: string[]) {
  const apps: Set<string> = new Set();
  for (const f in files) {
    getAppsForFile(pathMaps, f).forEach((app) => apps.add(app));
  }
  return apps;
}

function getAppsForFile(pathMaps: PathMaps, f: string) {
  const apps: Set<string> = new Set();
  for (let i = 0; i < pathMaps.length; i++) {
    const map = pathMaps[i];
    if (map.regex.test(f)) {
      map.apps.forEach((app) => apps.add(app));
    }
  }
  return apps;
}
