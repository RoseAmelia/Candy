class CommandHandler {
    constructor(client) {
        this.client = client;
        this.glob = require("glob");
        this.path = require("path");
    };

    emit() {
        const files = this.glob.sync("./src/commands/**/**/*").filter(f => f.endsWith(".js"));

        for (const file of files) {
            const command = require(this.path.resolve(file));

            this.client.commands.set(command.name, command);
        };
    };
};

module.exports = CommandHandler;