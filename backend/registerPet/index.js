const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    context.log('Function registerPet is starting.');

    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://agreeable-pebble-031a20b03.5.azurestaticapps.net',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    };

    if (req.method === 'OPTIONS') {
        context.res.status = 204;
        context.done();
        return;
    }

    // const uri = process.env.MONGO_DB_CONNECTION_STRING;
    const uri = 'mongodb+srv://waqqlyadmin:webpassword@waqqly.w1ozwza.mongodb.net/';
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
        const result = await pets.insertOne(newPet);

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
