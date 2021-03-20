import { expect } from "chai";
import "mocha";
import { getApps } from "../src/apps";

describe("getApps", function () {
  it("returns list of apps", function () {
    const pathMaps = [
      { regex: new RegExp("auth-server/.*"), apps: ["auth-server"] },
      { regex: new RegExp("api/.*"), apps: ["api"] },
      {
        regex: new RegExp("utils/.*"),
        apps: ["auth-server", "api", "notification-server"],
      },
    ];
    let apps = getApps(pathMaps, ["auth-server/const.rb", "api/handler.rb"]);
    expect(apps).to.deep.equals(["auth-server", "api"]);
    apps = getApps(pathMaps, ["auth-server/const.rb", "utils/math.rb"]);
    expect(apps).to.deep.equals(["auth-server", "api", "notification-server"]);
  });
});
