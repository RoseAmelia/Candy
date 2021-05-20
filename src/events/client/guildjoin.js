const { Client, Guild } = require("discord.js");

module.exports = {
    name: "guildCreate",
    /**
     * @param {Client} client 
     * @param {Guild} guild
     */
    execute: async (guild, client) => {

        const channel = client.channels.cache.get(client.settings.LOGS.JOIN);
        
        try {
            channel.send(`Candy joined a server - ${guild.name} (${guild.id})`);
        } catch (error) {
            console.log(client.error.FAILED_LOG);
        };
    },
};