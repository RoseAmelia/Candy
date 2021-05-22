const Client = require("../../struct/CandyClient");
const { Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "about",
    description: {
        content: "About candy"
    },
    aliases: [
        "botinfo"
    ],
    guildOnly: true,
    category: "info",
    cooldown: 6 + 2,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    execute: async (client, message) => {

        const candy = new MessageEmbed();
        candy.setTitle("Candy's Information");
        candy.setColor("#e29bf8");
        candy.setThumbnail(client.user.displayAvatarURL());
        candy.addField("📛 Username", `\`${client.user.username}\``);
        candy.addField("🏷️ Tag", `\`${client.user.discriminator}\``);
        candy.addField("❄️ Launched", `\`${moment(client.user.createdAt).fromNow()}\``);
        candy.addField("Servers", `\`${client.guilds.cache.size}\``);
        candy.addField("Users", `\`${client.users.cache.filter(user => !user.bot).size}\``);
        candy.addField("** **", `[Invite](${client.settings.INVITE}) ・[Community](${client.settings.SERVER}) ・[Github](${client.settings.GITHUB})`);

        return message.channel.send(candy);
    },
};
