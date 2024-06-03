const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    const uri = "mongodb+srv://hughd:waqqlywebapp@waqqly.w1ozwza.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('waqqlydb');
        const pets = database.collection('pets');

        const newPet = req.body;
        const result = await pets.insertOne(newPet);

        context.res = {
            status: 201,
            body: result
        };
    } finally {
        await client.close();
    }
};