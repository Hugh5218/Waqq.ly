const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    const uri = process.env.MONGO_DB_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('waqqlydb');
        const walkers = database.collection('walkers');

        if (!req.body) {
            context.res = {
                status: 400,
                body: "Invalid input"
            };
            return;
        }

        const newWalker = req.body;
        console.log("Inserting new walker:", newWalker);

        const result = await walkers.insertOne(newWalker);

        context.res = {
            status: 201,
            body: result
        };
    } catch (error) {
        console.error("Error inserting walker:", error);
        context.res = {
            status: 500,
            body: "Internal Server Error"
        };
    } finally {
        await client.close();
    }
};