const { MongoClient } = require("@roseamelia/easymongo");

class InteractDatabase extends MongoClient {
    constructor() {
        super({
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        this.error = require("../utils/CandyError");
    };

    interact(url) {
        if (!url || typeof (url) !== "string") throw new ReferenceError(this.error.MONGO_URL_MISSING);

        try {
            super.connect(url)
        } catch (error) {
            throw new ReferenceError(this.error.MONGO_URL_INVALID);
        };
        console.log(`[ Mongo ] Connected`);
    };
};

module.exports = InteractDatabase;
