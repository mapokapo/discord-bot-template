import config from "./index";
import path from "path";
import fs from "fs/promises";
import parseCommandJson from "./parseCommandJson";

const rootDir = path.resolve(__dirname, "..");
const commandsDir = path.join(rootDir, "commands");

async function registerCommands() {
  const commandDirs = await fs.readdir(commandsDir);
  for (const commandDir of commandDirs) {
    const commandJsonFile = await fs.readFile(
      path.join(commandsDir, commandDir, "command.json"),
      "utf8"
    );
    const command = parseCommandJson(commandJsonFile, commandDir);

    const commandJsPath = path.join(commandsDir, commandDir, "command.js");
    const commandExecute = (await import(commandJsPath)).execute;
    command.execute = commandExecute;

    config.commands.push(command);
  }
}

export default registerCommands;
