const chalk = require("chalk");
const { Client } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute: (client) => {

        console.log(`${chalk.cyan("[ Ready ]")} ${client.user.username} is online`);
    },
};