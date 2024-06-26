const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    context.log('Function getPets is starting.');

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
        const { resources: petsList } = await container.items.readAll().fetchAll();
        context.log('Pets list:', petsList);

        context.res = {
            status: 200,
            body: petsList
        };
    } catch (error) {
        context.log('Error getting pets:', error.message);
        context.res = {
            status: 500,
            body: `Internal Server Error: ${error.message}`
        };
    }
    context.log('Function getPets has finished.');
};



// const { MongoClient } = require('mongodb');

// module.exports = async function (context, req) {
//     context.log('Function getPets is starting.');

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

//         const petsList = await pets.find({}).toArray();

//         context.res = {
//             ...context.res,
//             status: 200,
//             body: petsList
//         };
//     } catch (error) {
//         context.res = {
//             ...context.res,
//             status: 500,
//             body: `Internal Server Error: ${error.message}`
//         };
//     } finally {
//         await client.close();
//     }
// };