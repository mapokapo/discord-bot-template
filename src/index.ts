import path from "path";
import fs from "fs";
import Config from "./types/Config";
import dotenv from "dotenv";
import { Client, ClientOptions, Intents } from "discord.js";
import parseCommand from "./parseCommand";
import registerCommands from "./registerCommands";
import formatError from "./utils/formatError";

dotenv.config();

const config: Config = {
  token: process.env.TOKEN as string,
  prefix: process.env.PREFIX as string,
  botName: process.env.BOT_NAME as string,
  botAvatar: process.env.BOT_AVATAR as string,
  botUrl: process.env.BOT_URL as string,
  botDesc: process.env.BOT_DESC as string,
  version: JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf8")
  ).version as string,
  commands: [],
};

const clientOptions: ClientOptions = {
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
};
const client = new Client(clientOptions);

function main() {
  client.on("messageCreate", (message) => {
    if (
      !message.content.startsWith(config.prefix) ||
      message.content.length <= 1 ||
      message.author.bot
    )
      return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift()!.toLowerCase();

    const error = parseCommand(message, command, args);
    if (error !== null) {
      message.channel.send(formatError(error));
    }
  });

  client
    .login(config.token)
    .then(() => {
      console.log(`Discord Bot successfully logged in`);
    })
    .catch((err) => {
      console.log(`There was an error trying to log in the Discord bot`);
      console.log(err);
    });
}

registerCommands().then(() => {
  main();
});

export default config;
