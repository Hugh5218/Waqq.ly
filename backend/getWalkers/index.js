const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    context.log('Function getWalkers is starting.');

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
    const container = database.container('walkers');

    try {
        const { resources: walkersList } = await container.items.readAll().fetchAll();
        context.log('Walkers list:', walkersList);

        context.res = {
            status: 200,
            body: walkersList
        };
    } catch (error) {
        context.log('Error getting walkers:', error.message);
        context.res = {
            status: 500,
            body: `Internal Server Error: ${error.message}`
        };
    }
    context.log('Function getWalkers has finished.');
};



// const { MongoClient } = require('mongodb');

// module.exports = async function (context, req) {
//     context.log('Function getWalkers is starting.');

//    context.res = {
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
//         const walkers = database.collection('walkers');

//         const walkersList = await walkers.find({}).toArray();

//         context.res = {
//             ...context.res,
//             status: 200,
//             body: walkersList
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