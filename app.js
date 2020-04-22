async function main(){
    const MongoClient = require('mongodb').MongoClient;
    getRankPerCountry(MongoClient);
    getAverages(MongoClient);
    getAverageForAllYearsPerCountry(MongoClient);
}
main().catch(console.error);

/**
 * 
 * @param {*} MongoClient
 * Query for Happiness Ranking  
 */
async function getRankPerCountry(MongoClient) {
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

async function getAverages(MongoClient) {
    var assert = require('assert');
    const agg = [
        {
            '$group': {
            '_id': '$Region', 
            'average': {
            '$avg': {
            '$toDecimal': '$Happiness Score'
            }
            }
        }
        }
    ];
  
  MongoClient.connect(
    'mongodb+srv://freda:freda123@cs4440-qjbla.mongodb.net/test?authSource=admin&replicaSet=cs4440-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db('Happiness').collection('2015');
      coll.aggregate(agg, (cmdErr, result) => {
        assert.equal(null, cmdErr);
      });
      client.close();
    });
}

async function getAverageForAllYearsPerCountry(MongoClient) {
    const assert = require('assert');
    const agg = [
    {
      '$lookup': {
        'from': '2016', 
        'localField': 'Country', 
        'foreignField': 'Country', 
        'as': 'Happ_info'
      }
    }, {
      '$unwind': {
        'path': '$Happ_info'
      }
    }, {
      '$lookup': {
        'from': '2018', 
        'localField': 'Country', 
        'foreignField': 'Country', 
        'as': 'Happ_info2'
      }
    }, {
      '$unwind': {
        'path': '$Happ_info2'
      }
    }, {
      '$lookup': {
        'from': '2019', 
        'localField': 'Country', 
        'foreignField': 'Country', 
        'as': 'Happ_info3'
      }
    }, {
      '$unwind': {
        'path': '$Happ_info3'
      }
    }, {
      '$group': {
        '_id': '$Country', 
        'average': {
          '$avg': {
            '$toDecimal': '$Happiness_Score'
          }
        }
      }
    }
  ];
  
  MongoClient.connect(
    'mongodb+srv://freda:freda123@cs4440-qjbla.mongodb.net/test?authSource=admin&replicaSet=cs4440-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db('Happiness2').collection('2015');
      coll.aggregate(agg, (cmdErr, result) => {
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