import Command from "./Command";

export default interface Config {
  token: string;
  prefix: string;
  commands: Command[];
  botName: string;
  botAvatar: string;
  botUrl: string;
  botDesc: string;
  version: string;
}
