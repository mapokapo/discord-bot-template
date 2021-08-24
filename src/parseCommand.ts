import { Message } from "discord.js";
import config from ".";
import Argument from "./types/Argument";
import Command from "./types/Command";
import discordTagCheck from "./utils/discordTagCheck";

function validateArguments(
  command: Command,
  args: string[]
): string[] | string {
  if (command.args.slice(-1)[0]?.type.slice(-1) === "+") {
    if (args.length < command.args.filter((arg) => arg.default === null).length)
      return `Invalid amount of arguments passed to command. (\`passed: ${
        args.length
      }, required: ${
        command.args.filter((arg) => arg.default === null).length ===
        command.argc
          ? `${command.argc}\``
          : `between ${
              command.args.filter((arg) => arg.default === null).length
            } and ${command.argc}+\``
      })`;
  } else if (
    command.args.filter((arg) => arg.default === null).length > args.length ||
    args.length > command.argc
  )
    return `Invalid amount of arguments passed to command. (\`passed: ${
      args.length
    }, required: ${
      command.args.filter((arg) => arg.default === null).length === command.argc
        ? `${command.argc}\``
        : `between ${
            command.args.filter((arg) => arg.default === null).length
          } and ${command.argc}+\``
    })`;
  if (
    args.length === 0 &&
    command.argc === 1 &&
    command.args[0]!.default !== null
  ) {
    args = args.concat(command.args[0]!.default!.split(" "));
  } else {
    for (const argIndex in args) {
      const commandArg = command.args[argIndex] as Argument;
      const arg = args[argIndex] as string;

      if (
        args[parseInt(argIndex) + 1] === undefined &&
        command.args[parseInt(argIndex) + 1] !== undefined &&
        command.args[parseInt(argIndex) + 1]!.default !== undefined &&
        command.args[parseInt(argIndex) + 1]!.default !== null
      ) {
        args = args.concat(
          command.args[parseInt(argIndex) + 1]!.default!.split(" ")
        );
      }

      if (
        arg !== undefined &&
        commandArg === undefined &&
        command.args.slice(-1)[0]!.type.slice(-1) === "+"
      ) {
        const argType = command.args.slice(-1)[0]!.type.slice(-1);
        if (argType !== "string") {
          if (argType === "integer" && !/^\d+$/.test(arg))
            return `Argument \`${arg}\` at position **#${
              parseInt(argIndex) + 1
            }** must be an \`integer\`.`;
          if (argType === "float" && !/^\d+\.\d+$/.test(arg))
            return `Argument \`${arg}\` at position **#${
              parseInt(argIndex) + 1
            }** must be a \`decimal number\`.`;
          if (argType === "bool" && !(arg === "true" || arg === "false"))
            return `Argument \`${arg}\` at position **#${
              parseInt(argIndex) + 1
            }** must be a \`true/false\` value.`;
          if (argType === "Username" && !discordTagCheck.checkUserTag(arg))
            return `Argument \`${arg}\` at position **#${
              parseInt(argIndex) + 1
            }** must be a valid \`user\` tag.`;
          if (argType === "Channel" && !discordTagCheck.checkChannelTag(arg))
            return `Argument \`${arg}\` at position **#${
              parseInt(argIndex) + 1
            }** must be a valid \`channel\` tag.`;
          if (argType === "Role" && !discordTagCheck.checkRoleTag(arg))
            return `Argument \`${arg}\` at position **#${
              parseInt(argIndex) + 1
            }** must be a valid \`role\` tag.`;
        }
      } else if (commandArg.type !== "string") {
        if (commandArg.type === "integer" && !/^\d+$/.test(arg))
          return `Argument \`${arg}\` at position **#${
            parseInt(argIndex) + 1
          }** must be an \`integer\`.`;
        if (commandArg.type === "float" && !/^\d+\.\d+$/.test(arg))
          return `Argument \`${arg}\` at position **#${
            parseInt(argIndex) + 1
          }** must be a \`decimal number\`.`;
        if (commandArg.type === "bool" && !(arg === "true" || arg === "false"))
          return `Argument \`${arg}\` at position **#${
            parseInt(argIndex) + 1
          }** must be a \`true/false\` value.`;
        if (
          commandArg.type === "Username" &&
          !discordTagCheck.checkUserTag(arg)
        )
          return `Argument \`${arg}\` at position **#${
            parseInt(argIndex) + 1
          }** must be a valid \`user\` tag.`;
        if (
          commandArg.type === "Channel" &&
          !discordTagCheck.checkChannelTag(arg)
        )
          return `Argument \`${arg}\` at position **#${
            parseInt(argIndex) + 1
          }** must be a valid \`channel\` tag.`;
        if (commandArg.type === "Role" && !discordTagCheck.checkRoleTag(arg))
          return `Argument \`${arg}\` at position **#${
            parseInt(argIndex) + 1
          }** must be a valid \`role\` tag.`;
      }
    }
  }

  return args;
}

function parseCommand(
  message: Message,
  input: string,
  args: string[]
): string | null {
  const commands = config.commands;

  for (const command of commands) {
    if (command.keyword === input) {
      const validArgs = validateArguments(command, args);
      if (typeof validArgs === "string") return validArgs;
      return command.execute(message, command.args, validArgs);
    }
  }

  return `Command \`${input}\` not found.`;
}

export default parseCommand;
