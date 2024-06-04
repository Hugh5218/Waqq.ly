const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    context.log('Function registerWalker is starting.');

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
        const result = await walkers.insertOne(newWalker);

        context.res = {
            status: 201,
            body: result.ops[0]
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Internal Server Error: ${error.message}`
        };
    } finally {
        await client.close();
    }
};