const { Client, Collection } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");

class CandyClient extends Client {
    constructor() {
        super({
            messageCacheMaxSize: 80,
            messageCacheLifetime: 30,
            messageEditHistoryMaxSize: 10,
            disableMentions: "everyone",
            ws: {
                intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
            }
        });

        this.error = require("../utils/CandyError");
        this.chalk = require("chalk");
        this.settings = require("../utils/Settings");

        this.CommandHandler = new CommandHandler(this);
        this.EventHandler = new EventHandler(this);

        this.events = new Collection();
        this.commands = new Collection();
        this.aliases = new Collection();

    };

    init(token) {
        if (!token || typeof (token) !== "string") throw new ReferenceError(this.error.TOKEN_MISSING);

        super.login(token).catch(error => {
            console.log(this.error.TOKEN_INVALID);
        });

        this.CommandHandler.emit();
        this.EventHandler.emit();
        this.settings.LOGS.JOIN

        this.on("message", async message => {

            if (message.author.bot) return;
            if (!message.content.startsWith(this.settings.PREFIX)) return;

            const args = message.content.slice(this.settings.PREFIX.length).trim().split(/ +/g);
            const x = args.shift().toLowerCase();

            let command = this.commands.get(x);
            if (!command) command = this.commands.get(this.aliases.get(x));

            try {
                if (command) {

                    if (command.guildOnly === true) {
                        if (message.channel.type === "dm") return;
                    };
                    
                    if (command.teamOnly === true) {
                        if (this.settings.TEAM.includes(message.author.id) === false) return;
                    };
                    /**
                     * @param {Client} client
                     */
                    command.execute(this, message, args);
                }
            } catch(error) {
                console.log(error);
                message.channel.send("Cannot execute the command due to an error");
            };
        });
    };
};

module.exports = CandyClient;