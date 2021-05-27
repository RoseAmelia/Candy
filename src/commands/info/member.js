const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "memberinfo",
    description: {
        content: "Get to know few info about a member"
    },
    aliases: [
        "userinfo",
        "whois"
    ],
    guildOnly: true,
    category: "info",
    cooldown: 7 + 1,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        const member = message.guild.members.cache.get(args[0]) || message.member;
        
        let ack;
        if (member.hasPermission("ADMINISTRATOR")) {
            ack = "Server Admin";
        };
        if (member.user.id === member.guild.ownerID) {
            ack = "Server Owner";
        };

        let keypermission = [];

        if (member.hasPermission("ADMINISTRATOR")) {
            keypermission.push("Admin");
        };
        if (member.hasPermission("KICK_MEMBERS")) {
            keypermission.push("Kick");
        };
        if (member.hasPermission("BAN_MEMBERS")) {
            keypermission.push("Ban");
        };
        if (member.hasPermission("MANAGE_MESSAGES")) {
            keypermission.push("Manage Message");
        };
        if (member.hasPermission("MANAGE_CHANNELS")) {
            keypermission.push("Manage Channel");
        };
        if (member.hasPermission("MENTION_EVERYONE")) {
            keypermission.push("Everyone");
        };
        if (member.hasPermission("MANAGE_NICKNAMES")) {
            keypermission.push("Manage Nickname");
        };
        if (member.hasPermission("MANAGE_ROLES")) {
            keypermission.push("Manage Role");
        };
        if (member.hasPermission("MANAGE_GUILD")) {
            keypermission.push("Manage Server");
        };
        if (member.hasPermission("MANAGE_WEBHOOKS")) {
            keypermission.push("Manage Webhook");
        };
        if (member.hasPermission("MANAGE_EMOJIS")) {
            keypermission.push("Manage Emoji");
        };
        if (keypermission.length === 0) {
            keypermission.push("No key permission.");
        };

        let userinfo = new MessageEmbed();
        userinfo.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
        userinfo.setTitle("Userinfo");
        userinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true}));
        userinfo.setColor(client.settings.EMBED.COLOR);
        userinfo.addField("Joined Discord", moment(member.user.createdAt).format("ll"));
        userinfo.addField("Joined Server", moment(member.joinedAt).format("ll"));
        userinfo.addField("Acknowledgement", ack);
        userinfo.addField("Key Permissions", keypermission.join(" , "));
        userinfo.setFooter("ID: " + member.user.id);

        return message.channel.send(userinfo);

    },
};
