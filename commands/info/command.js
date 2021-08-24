const Discord = require("discord.js");
const config = require("../../build/index").default;
const capitalizeWords = require("../../build/utils/capitalizeWords").default;
/**
 *
 * @param {Discord.Message} message
 * @param {import("../../src/types/Argument").default[]} args
 * @param {string[]} inputArgs
 * @returns {null|string} A string representing an error, or null if there was no error.
 */
function execute(message, args, inputArgs) {
  const commandArg = inputArgs[0];
  if (commandArg === "all") {
    const infoEmbed = new Discord.MessageEmbed()
      .setColor(config.botTheme ?? "#7289DA")
      .setAuthor(config.botName ?? "Test Bot", config.botAvatar, config.botUrl)
      .setThumbnail(config.botAvatar)
      .setTitle(`About ${config.botName ?? "Test Bot"}`)
      .setURL(config.botUrl ?? "https://discord.js.org/")
      .setDescription(config.botDesc)
      .addField(
        `Showing the first ${
          config.commands.slice(0, 10).filter((e) => e !== undefined).length
        } out of ${config.commands.length} available commands:`,
        `
          ${config.commands
            .slice(0, 10)
            .filter((e) => e !== undefined)
            .map(
              (cmd) =>
                `\n**${cmd.name}** - ${cmd.desc}\n(usage: \`${cmd.usage}\`)`
            )
            .join("\n")}
        `
      )
      .addFields(
        { name: "\u200b", value: "\u200b" },
        { name: "Author", value: `*ulla britta*`, inline: true },
        { name: "Version", value: `*${config.version}*`, inline: true }
      )
      .setFooter(
        `${message.author.username} ran the \`info\` command`,
        message.author.avatarURL() || undefined
      )
      .setTimestamp();

    message.channel.send({
      embeds: [infoEmbed],
    });
  } else {
    const command = config.commands.find((cmd) => cmd.keyword === commandArg);
    if (command === undefined) {
      return `Command \`${commandArg}\` not found.`;
    }
    const infoEmbed = new Discord.MessageEmbed()
      .setColor(config.botTheme ?? "#7289DA")
      .setAuthor(config.botName ?? "Test Bot", config.botAvatar, config.botUrl)
      .setThumbnail(config.botAvatar)
      .setTitle(`${command.name} command`)
      .setURL(config.botUrl ?? "https://discord.js.org/")
      .setDescription(command.desc)
      .addField(
        `Command info`,
        `**Usage:** \`${command.usage}\`\n
				**Argument count:** \`${command.argc}\`${
          command.argc === 0
            ? ""
            : `\n
				**Argument details:**`
        }`
      )
      .addFields([
        ...command.args.map((arg) => ({
          name: `**${arg.name}**`,
          value: `*Description:* ${arg.desc}\n
				*Type:* \`${capitalizeWords(arg.type)}\`\n
				*Default Value:* \`${
          arg.default === null ? "No default value" : arg.default
        }\``,
          inline: true,
        })),
      ])
      .setFooter(
        `${message.author.username} ran the \`info\` command`,
        message.author.avatarURL() || undefined
      )
      .setTimestamp();

    message.channel.send({
      embeds: [infoEmbed],
    });
  }

  return null;
}

module.exports = {
  execute,
};
