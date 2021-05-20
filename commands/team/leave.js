const { Client, Message } = require("discord.js");

module.exports = {
    name: "leave",
    teamOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {

        const id = args[0];

        if (!id) {
            return message.channel.send("No such valid id");
        };

        if (id === "this") {
            return message.channel.send("Candy leaving the server in a while.").then(m => {
                setTimeout(function () {
                    try {
                        message.guild.leave();
                    } catch (error) {
                        message.channel.send("Error occurred! It may happened because you tried it on dms");
                    }
                }, 2000);
            });
        } else {
            return message.channel.send("Candy leaving the server in a while.").then(m => {
                setTimeout(function () {
                    try {
                        client.guilds.cache.get(id).leave();
                    } catch (error) {
                        message.channel.send("Error occurred! May happened due to invalid id");
                    }
                }, 2000);
            });
        };
    },
};