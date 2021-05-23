const { Client, Collection } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const EventHandler = require("./EventHandler");
const InteractDatabase = require("./InteractDatabase");

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
        this.settings = require("../utils/Settings.json");

        this.CommandHandler = new CommandHandler(this);
        this.EventHandler = new EventHandler(this);
        this.InteractDatabase = new InteractDatabase();

        this.events = new Collection();
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldowns = new Collection();

    };

    init(token) {
        if (!token || typeof (token) !== "string") throw new ReferenceError(this.error.TOKEN_MISSING);

        super.login(token).catch(error => {
            console.log(this.error.TOKEN_INVALID);
        });

        this.CommandHandler.emit();
        this.EventHandler.emit();
        this.InteractDatabase.interact(this.settings.MONGOURL);

        this.on("message", async message => {

            if (message.author.bot) return;
            if (!message.content.startsWith(this.settings.PREFIX)) return;

            const args = message.content.slice(this.settings.PREFIX.length).trim().split(/ +/g);
            const x = args.shift().toLowerCase();



            let command = this.commands.get(x);
            if (!command) command = this.commands.get(this.aliases.get(x));

            try {
                if (command) {

                    if (command.guildOnly && command.guildOnly === true) {
                        if (message.channel.type === "dm") return;
                    };

                    if (command.teamOnly && command.guildOnly === true) {
                        if (this.settings.TEAM.includes(message.author.id) === false) return;
                    };

                    if (!this.cooldowns.has(command.name)) {
                        this.cooldowns.set(command.name, new Collection());
                    }

                    if (this.settings.TEAM.includes(message.author.id)) {
                        return command.execute(this, message, args);
                    };
                    
                    const now = Date.now();
                    const time = this.cooldowns.get(command.name);
                    const cooldown = (command.cooldown || 3) * 1000;

                    if (time.has(message.author.id)) {
                        const expirationTime = time.get(message.author.id) + cooldown;

                        if (now < expirationTime) {
                            return;
                        };
                    };

                    time.set(message.author.id, now);
                    setTimeout(() => time.delete(message.author.id), cooldown);

                    command.execute(this, message, args);
                }
            } catch (error) {
                console.log(error);
                message.channel.send("Cannot execute the command due to an error");
            };
        });
    };
};

module.exports = CandyClient;
