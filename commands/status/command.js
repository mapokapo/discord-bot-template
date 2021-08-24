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
  const serverName = message.guild.name;
  const memberCount = message.guild.memberCount;
  const serverAge =
    Math.round(
      ((Date.now() - message.guild.createdAt.getTime()) / (1000 * 3600 * 24)) *
        100
    ) / 100;
  const botJoinedAge =
    Math.round(
      ((Date.now() - message.guild.joinedAt.getTime()) / (1000 * 3600 * 24)) *
        100
    ) / 100;
  const botAge =
    Math.round(
      ((Date.now() - message.author.createdAt.getTime()) / (1000 * 3600 * 24)) *
        100
    ) / 100;
  const serverDesc = message.guild.description;
  const restrictionLevel = capitalizeWords(
    message.guild.nsfwLevel.toLowerCase().replace("_", " ")
  );
  const serverIcon = message.guild.iconURL();
  const infoEmbed = new Discord.MessageEmbed()
    .setColor(config.botTheme ?? "#7289DA")
    .setAuthor(config.botName, serverIcon)
    .setThumbnail(serverIcon)
    .setTitle(serverName)
    .setDescription(serverDesc ?? "No description.")
    .addFields(
      { name: "Member count", value: `*${memberCount}*` },
      { name: "Server age (days)", value: `*${serverAge}*` },
      { name: "Bot joined (days)", value: `*${botJoinedAge}*`, inline: true },
      { name: "Bot age (days)", value: `*${botAge}*`, inline: true },
      {
        name: "Restriction level",
        value: `*${restrictionLevel}*`,
      }
    )
    .setFooter(
      `${message.author.username} ran the \`status\` command`,
      message.author.avatarURL() || undefined
    )
    .setTimestamp();

  message.channel.send({
    embeds: [infoEmbed],
  });
  return null;
}

module.exports = {
  execute,
};
