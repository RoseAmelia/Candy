const Client = require("./CandyClient");

class EventHandler {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
        this.glob = require("glob");
        this.path = require("path");
    };

    emit() {
        const files = this.glob.sync("./src/events/**/**/*").filter(f => f.endsWith(".js"));

        for (const file of files) {
            const event = require(this.path.resolve(file));
            
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args, this.client));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args, this.client));
            };

            this.client.events.set(event.name, event);

            console.log(`${this.client.chalk.green("[ Event ]")} ${event.name} Loaded`);
        };
    };
};

module.exports = EventHandler;