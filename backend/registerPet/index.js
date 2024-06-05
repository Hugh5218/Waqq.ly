const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    context.log('Function registerPet is starting.');

    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    };

    if (req.method === 'OPTIONS') {
        context.res.status = 204;
        context.done();
        return;
    }

    const endpoint = process.env.COSMOS_DB_ENDPOINT;
    const key = process.env.COSMOS_DB_KEY;
    const client = new CosmosClient({ endpoint, key });

    const database = client.database('waqqlydb');
    const container = database.container('pets');

    try {
        if (!req.body || !req.body.id) {
            context.log('Invalid input received.');
            context.res = {
                status: 400,
                body: "Invalid input"
            };
            return;
        }

        const newPet = req.body;
        context.log('Inserting new pet:', newPet);

        const { resource } = await container.items.create(newPet, { partitionKey: newPet.id });
        context.log('Insert result:', resource);

        context.res = {
            status: 201,
            body: resource
        };
    } catch (error) {
        context.log('Error inserting pet:', error.message);
        context.res = {
            status: 500,
            body: `Internal Server Error: ${error.message}`
        };
    }
    context.log('Function registerPet has finished.');
};



// const { MongoClient } = require('mongodb');

// module.exports = async function (context, req) {
//     context.log('Function registerPet is starting.');

//     context.res = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': 'https://agreeable-pebble-031a20b03.5.azurestaticapps.net',
//             'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//         }
//     };

//     if (req.method === 'OPTIONS') {
//         context.res.status = 204;
//         context.done();
//         return;
//     }

//     const uri = process.env.MONGO_DB_CONNECTION_STRING;
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();
//         const database = client.db('waqqlydb');
//         const pets = database.collection('pets');

//         if (!req.body) {
//             context.res = {
//                 status: 400,
//                 body: "Invalid input"
//             };
//             return;
//         }

//         const newPet = req.body;
//         const result = await pets.insertOne(newPet);

//         context.res = {
//             status: 201,
//             body: result.ops[0]
//         };
//     } catch (error) {
//         context.res = {
//             status: 500,
//             body: `TESTTTT Internal Server Error: ${error.message}`
//         };
//     } finally {
//         await client.close();
//     }
// };
