const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "guildinfo",
    description: {
        content: "Check out info about the bot"
    },
    aliases: [
        "si",
        "gi",
        "serverinfo"
    ],
    guildOnly: true,
    category: "info",
    cooldown: 8 + 2,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        const vlevel = {
            "NONE": "None 🔴",
            "LOW": "Low 🟡",
            "MEDIUM": "Medium 🔵",
            "HIGH": "High 🟣",
            "VERY_HIGH": "Highest 🟢"
        };

        const server = new MessageEmbed();
        server.setTitle(message.guild.name);
        server.setColor("#d3bbfd");
        server.setThumbnail(message.guild.iconURL({ dynamic: true }));
        server.addField("ID", `\`${message.guild.id}\``);
        server.addField("Members", `\`${message.guild.members.cache.filter(user => !user.user.bot).size}\``);
        server.addField("Bots", `\`${message.guild.members.cache.filter(user => user.user.bot).size}\``);
        server.addField("Founded At", `\`${moment(message.guild.createdAt).format("ll")}\``);
        server.addField("Owner", `\`${message.guild.owner.user.username}\``);
        server.addField("VLevel", `${vlevel[message.guild.verificationLevel]}`);

        const page = new MessageEmbed();
        page.setTitle(message.guild.name);
        page.setColor("#d3bbfd");
        page.setThumbnail(message.guild.iconURL({ dynamic: true}));
        page.addField("Boost Count", message.guild.premiumSubscriptionCount, true);
        page.addField("Boost Tier", message.guild.premiumTier ? message.guild.premiumTier: "None", true);
        page.addField("Roles", message.guild.roles.cache.size);
        page.addField("Channels", message.guild.channels.cache.filter(channel => channel.type !== "category").size);

        const m = await message.channel.send(server);
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return;

        m.react("▶️");
        m.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == "▶️"),
            { max: 1, time: 10000 }).then(collected => {

                if (collected.first().emoji.name == "▶️") {
                    m.edit(page);
                    m.reactions.removeAll();
                };
            }).catch(() => {
                m.reactions.removeAll();
            });
    },
};
