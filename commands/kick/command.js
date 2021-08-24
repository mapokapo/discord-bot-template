const Discord = require("discord.js");
const restArgsIntoSingleArg =
  require("../../build/utils/restArgsIntoSingleArg").default;
/**
 *
 * @param {Discord.Message} message
 * @param {import("../../src/types/Argument").default[]} args
 * @param {string[]} inputArgs
 * @returns {null|string} A string representing an error, or null if there was no error.
 */
function execute(message, args, inputArgs) {
  console.log(inputArgs, args);
  console.log(restArgsIntoSingleArg(args, inputArgs));
  return null;
}

module.exports = {
  execute,
};
