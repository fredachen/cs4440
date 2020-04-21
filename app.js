async function main(){
    const MongoClient = require('mongodb').MongoClient;

    const uri = "mongodb+srv://freda:freda123@cs4440-qjbla.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useUnifiedTopology: true });
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);

async function getCollection() {
    
    console.log()
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};