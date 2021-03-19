import { expect } from "chai";
import "mocha";
import { parseConfig } from "../src/config";

describe("parseConfig", function () {
  it("parses config nicely", function () {
    const yamlConfig = `
path_mappings:
  auth-server/.*: auth-server
  api/.*: api
  notification/.*: notification-server
  utils/.*: [auth-server, api, notification-server]
`;

    const parsed = parseConfig(yamlConfig);
    expect(parsed).to.have.length(4);
    expect(parsed[0].regex).to.deep.equals(/auth-server\/.*/);
    expect(parsed[0].apps).to.deep.equals(["auth-server"]);
    expect(parsed[3].regex).to.deep.equals(/utils\/.*/);
    expect(parsed[3].apps).to.deep.equals([
      "auth-server",
      "api",
      "notification-server",
    ]);
  });
});
