const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    context.log('Function registerPet is starting.');

    const uri = process.env.MONGO_DB_CONNECTION_STRING;
    context.log('MongoDB connection string:', uri);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        context.log('Connected to MongoDB.');
        const database = client.db('waqqlydb');
        const pets = database.collection('pets');

        if (!req.body) {
            context.log('Invalid input received.');
            context.res = {
                status: 400,
                body: "Invalid input"
            };
            return;
        }

        const newPet = req.body;
        context.log('Inserting new pet:', newPet);

        const result = await pets.insertOne(newPet);
        context.log('Insert result:', result);

        context.res = {
            status: 201,
            body: result
        };
    } catch (error) {
        context.log('Error inserting pet:', error);
        context.res = {
            status: 500,
            body: "Internal Server Error"
        };
    } finally {
        await client.close();
        context.log('MongoDB connection closed.');
    }
    context.log('Function registerPet has finished.');
};