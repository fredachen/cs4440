async function main(){
    const MongoClient = require('mongodb').MongoClient;
    getCollection(MongoClient);
}
main().catch(console.error);

async function getCollection(MongoClient) {
    var assert = require('assert');
    const filter = {};
    const projection = {
        'Country': 1, 
        'Happiness Rank': 1
    };

MongoClient.connect(
  'mongodb+srv://freda:freda123@cs4440-qjbla.mongodb.net/test?authSource=admin&replicaSet=cs4440-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('Happiness').collection('2015');
    coll.find(filter, { projection: projection }, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};