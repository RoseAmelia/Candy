const CandyClient = require("./struct/CandyClient");
const client = new CandyClient();
const settings = require("./utils/Settings");
client.init(settings.TOKEN);

process.on("uncaughtException", async (error) => {
    require("./errors/uncaughtException")(error);
});

process.on("unhandledRejection", async (error) => {
    require("./errors/unhandledRejection")(error);
});

process.on("rejectionHandled", async (error) => {
    require("./errors/rejectionHandled")(error);
});