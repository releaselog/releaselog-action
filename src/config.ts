import * as YAML from "yaml";

type PathMap = {
  regex: RegExp;
  apps: string[];
};

export type PathMaps = PathMap[];

export function parseConfig(yamlConfig: string): PathMaps {
  const config = YAML.parse(yamlConfig);
  return parsePathMaps(config["path_mappings"]);
}

function parsePathMaps(config: { [key: string]: string | string[] }) {
  let maps: PathMaps = [];
  for (const k in Object.keys(config)) {
    const v: string | string[] = config[k];
    const apps = typeof v == "string" ? [v] : v;
    maps.push({ regex: new RegExp(k), apps });
  }
  return maps;
}
