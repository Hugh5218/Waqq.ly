const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    context.log('Function getWalkers is starting.');

    const uri = process.env.MONGO_DB_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('waqqlydb');
        const walkers = database.collection('walkers');

        const walkersList = await walkers.find({}).toArray();

        context.res = {
            status: 200,
            body: walkersList
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