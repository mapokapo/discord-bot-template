import { Message } from "discord.js";
import Argument from "./Argument";

export default interface Command {
  name: string;
  keyword: string;
  desc: string;
  usage: string;
  argc: number | string;
  args: Argument[];
  execute: (
    message: Message,
    args: Argument[],
    inputArgs: string[]
  ) => string | null;
}
