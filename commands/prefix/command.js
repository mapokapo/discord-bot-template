const Discord = require("discord.js");
const config = require("../../build/index").default;
/**
 *
 * @param {Discord.Message} message
 * @param {import("../../src/types/Argument").default[]} args
 * @param {string[]} inputArgs
 * @returns {null|string} A string representing an error, or null if there was no error.
 */
function execute(message, args, inputArgs) {
  const newPrefix = inputArgs[0];
  config.prefix = newPrefix;
  message.channel.send(`Prefix successfully changed to ${newPrefix}.`);
  return null;
}

module.exports = {
  execute,
};
