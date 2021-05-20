const { Client, Message } = require("discord.js");

module.exports = {
    name: "emit",
    teamOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        const event = args[0];
        
        if (!event) {
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.delete({ timeout: 500});
            } else {
                return;
            };
        };

        const option = args[1];

        if (!option) {
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.delete({ timeout: 500});
            } else {
                return;
            };
        };

        try {
            client.emit(event, option);
        } catch (error) {

        };
    },
};