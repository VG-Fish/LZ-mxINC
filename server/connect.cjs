const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const database_uri = process.env.ATLAS_URI;
  const client = new MongoClient(database_uri);

  try {
    await client.connect();

    const collections = await client.db("LZ-mxINC").collections();
    collections.forEach((collection) => {
      console.log(collection.s.namespace.collection);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main();
