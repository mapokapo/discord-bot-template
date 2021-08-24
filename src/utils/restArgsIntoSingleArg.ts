import Argument from "../types/Argument";

function restArgsIntoSingleArg(
  args: Argument[],
  inputArgs: string[]
): string[] {
  const restArgStartIndex = args.findIndex((arg) => arg.type.slice(-1) === "+");
  const restArgTransformed = inputArgs.slice(restArgStartIndex).join(" ");
  return inputArgs.slice(0, restArgStartIndex).concat(restArgTransformed);
}

export default restArgsIntoSingleArg;
