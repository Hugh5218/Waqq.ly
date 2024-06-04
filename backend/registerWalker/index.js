const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    context.log('Function registerWalker is starting.');

   const uri = process.env.MONGO_DB_CONNECTION_STRING;
    context.log('MongoDB connection string:', uri);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        context.log('Connected to MongoDB.');

        const database = client.db('waqqlydb');
        const walkers = database.collection('walkers');

        if (!req.body) {
            context.log('Invalid input received.');
            context.res = {
                status: 400,
                body: "Invalid input"
            };
            return;
        }

        const newWalker = req.body;
        context.log('Inserting new walker:', newWalker);

        const result = await walkers.insertOne(newWalker);
        context.log('Insert result:', result);

        context.res = {
            status: 201,
            body: result.ops[0]
        };
    } catch (error) {
        context.log('Error inserting walker:', error.message);
        context.res = {
            status: 500,
            body: `Internal Server Error: ${error.message}`
        };
    } finally {
        await client.close();
        context.log('MongoDB connection closed.');
    }
    context.log('Function registerWalker has finished.');
};