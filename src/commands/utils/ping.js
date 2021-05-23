const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: {
        content: "Get to know the ping of the bot."
    },
    guildOnly: false,
    category: "utils",
    cooldown: 6 + 2,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        const ping = new MessageEmbed();
        ping.setTitle("Candy's Ping");
        ping.setThumbnail(client.user.displayAvatarURL());
        ping.setColor("#d3bbfd");
        ping.setDescription(`Message: Calculating...\nAPI: Pending...`);

        const then = Date.now();

        message.channel.send(ping).then(m => {
            const now = Date.now();

                m.edit(
                    new MessageEmbed()
                        .setTitle("Candy's Ping")
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor("#d3bbfd")
                        .setDescription(`Message: ${now - then}ms\nAPI: Calculating...`)
                );

                setTimeout(function () {
                    m.edit(
                        new MessageEmbed()
                            .setTitle("Candy's Ping")
                            .setThumbnail(client.user.displayAvatarURL())
                            .setColor("#d3bbfd")
                            .setDescription(`Message: ${now - then}ms\nAPI: ${client.ws.ping}ms`)
                            .setFooter(`Total: ${now - then + client.ws.ping}ms`)
                    );
                }, 2000);
        }).catch(error => {});
    },
};
