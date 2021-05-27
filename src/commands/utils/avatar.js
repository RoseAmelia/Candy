const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: {
        content: "Get your avatar"
    },
    aliases: [
        "av"
    ],
    guildOnly: true,
    category: "utils",
    cooldown: 4 + 1,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        const member = message.guild.members.cache.get(args[0]) || message.member;

        const avatar = new MessageEmbed();
        avatar.setTitle(member.user.tag);
        avatar.setColor(client.settings.EMBED.COLOR);
        avatar.setDescription(`> [Link](${member.user.displayAvatarURL({ dynamic: true, size: 2048})})`);
        avatar.setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        return message.channel.send(avatar);
    },
};
