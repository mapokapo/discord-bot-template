import Argument from "./types/Argument";
import Command from "./types/Command";

function typeCheck(value: any, allowedTypes: string[]): boolean {
  if (value === undefined || value === null) return false;
  if (!allowedTypes.includes(typeof value)) return false;
  return true;
}

function throwError(propName: string, commandName: string) {
  throw new TypeError(
    `"${propName}" value in "command.json" of "${commandName}" command is invalid.`
  );
}

const _availableTypes = [
  "string",
  "integer",
  "float",
  "boolean",
  "Username",
  "Role",
  "Channel",
];

function parseCommandJson(jsonString: string, commandName: string): Command {
  const parsedJson = JSON.parse(jsonString);
  const command: Command = {} as Command;
  if (
    !typeCheck(parsedJson.argc, ["string", "number"]) ||
    (typeof parsedJson.argc === "string" && !/^\d+\+$/.test(parsedJson.argc))
  )
    throwError("argc", commandName);
  command.argc = parsedJson.argc as number;
  if (!typeCheck(parsedJson.desc, ["string"])) throwError("desc", commandName);
  command.desc = parsedJson.desc as string;
  if (!typeCheck(parsedJson.name, ["string"])) throwError("name", commandName);
  command.name = parsedJson.name as string;
  if (!typeCheck(parsedJson.usage, ["string"]))
    throwError("usage", commandName);
  command.usage = parsedJson.usage as string;
  if (!Array.isArray(parsedJson.args))
    throw new TypeError(
      `"args" value in "command.json" of "${commandName}" command is not an array.`
    );
  command.args = [];
  if (parsedJson.args.length > 0) {
    for (const argIndex in parsedJson.args) {
      const parsedArg = parsedJson.args[argIndex];
      const arg: Argument = {} as Argument;
      if (
        !(
          typeof parsedArg === "object" &&
          parsedArg !== null &&
          !Array.isArray(parsedArg)
        )
      ) {
        throw new TypeError(
          `Item number #${
            parseInt(argIndex) + 1
          } in "args" array in "command.json" of "${commandName}" command is not an object.`
        );
      }
      if (parsedJson.args.length !== parsedJson.argc)
        throw new SyntaxError(
          `"argc" value in "command.json" of "${commandName}" must match the number of items in the "args" array.`
        );
      if (!typeCheck(parsedArg.name, ["string"]))
        throw new TypeError(
          `"name" value in item number #${
            parseInt(argIndex) + 1
          } in "args" array in "command.json" of "${commandName}" is not valid.`
        );
      arg.name = parsedArg.name as string;
      if (!typeCheck(parsedArg.desc, ["string"]))
        throw new TypeError(
          `"desc" value in item number #${
            parseInt(argIndex) + 1
          } in "args" array in "command.json" of "${commandName}" is not valid.`
        );
      arg.desc = parsedArg.desc as string;
      if (
        parsedArg.default !== undefined &&
        parsedArg.default !== null &&
        typeof parsedArg.default !== "string"
      )
        throw new TypeError(
          `"default" value in item number #${
            parseInt(argIndex) + 1
          } in "args" array in "command.json" of "${commandName}" is not valid.`
        );
      arg.default = parsedArg.default ?? null;
      if (
        !typeCheck(parsedArg.type, ["string"]) ||
        (!_availableTypes.includes(parsedArg.type) &&
          !_availableTypes.map((a) => a + "+").includes(parsedArg.type))
      )
        throw new TypeError(
          `"type" value in item number #${
            parseInt(argIndex) + 1
          } in "args" array in "command.json" of "${commandName}" is not valid.`
        );
      if (
        parsedJson.args.filter((arg: Argument) => arg.type.slice(-1) === "+")
          .length > 1 ||
        (parsedJson.args.filter((arg: Argument) => arg.type.slice(-1) === "+")
          .length === 1 &&
          parsedJson.args.slice(-1)[0].type.slice(-1) !== "+")
      )
        throw new SyntaxError(
          `"type" value in item number #${
            parseInt(argIndex) + 1
          } in "args" array in "command.json" of "${commandName}" is not valid - either multiple overload argument types are provided, or an overload argument type is not at the last position of the "args" array.`
        );
      arg.type = parsedArg.type;
      command.args.push(arg);
    }
  }

  command.keyword = commandName;

  return command;
}

export default parseCommandJson;
