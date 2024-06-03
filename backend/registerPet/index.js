const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    const uri = process.env.MONGO_DB_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('waqqlydb');
        const pets = database.collection('pets');

        if (!req.body) {
            context.res = {
                status: 400,
                body: "Invalid input"
            };
            return;
        }

        const newPet = req.body;
        console.log("Inserting new pet:", newPet);

        const result = await pets.insertOne(newPet);

        context.res = {
            status: 201,
            body: result
        };
    } catch (error) {
        console.error("Error inserting pet:", error);
        context.res = {
            status: 500,
            body: "Internal Server Error"
        };
    } finally {
        await client.close();
    }
};