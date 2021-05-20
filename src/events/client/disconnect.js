const chalk = require("chalk");
const { Client } = require("discord.js");

module.exports = {
    name: "disconnect",
    /**
     * @param {Client} client 
     */
    execute: (client) => {
        client.on(`${chalk.red("[ Warning ]")} ${client.user.username} Disconnected`)
    },
};