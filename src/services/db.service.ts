
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Superhero from "../models/superhero";

export const collections: { 
    superheroes?: mongoDB.Collection<Superhero>,
} = {}

export async function connectToDatabase () {
    dotenv.config();
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || '');
    
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await applySchemaValidation(db);
   
    const superheroesCollection: mongoDB.Collection<Superhero> = db.collection<Superhero>(process.env.SUPERHEROES_COLLECTION_NAME || '');
 
    collections.superheroes = superheroesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${superheroesCollection.collectionName}`);
 }

 async function applySchemaValidation(db: mongoDB.Db) {
    const jsonSuperheroSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["nickname", "real_name", "origin_description", "superpowers", "catch_phrase", "Images"],
            additionalProperties: false,
            properties: {
                _id: {},
                nickname: {
                    bsonType: "string",
                    description: "'nickname' is required and is a string",
                },
                real_name: {
                    bsonType: "string",
                    description: "'real_name' is required and is a string",
                },
                origin_description: {
                    bsonType: "string",
                    description: "'origin_description' is required and is a string",
                },
                superpowers: {
                    bsonType: "string",
                    description: "'superpowers' is required and is a string",
                },
                catch_phrase: {
                    bsonType: "string",
                    description: "'catch_phrase' is required and is a string",
                },
                Images: {
                    bsonType: "array",
                    description: "'Images' is required and is an array",
                },
            },
        },
    };

    await db.command({
         collMod: process.env.SUPERHEROES_COLLECTION_NAME,
         validator: jsonSuperheroSchema
     }).catch(async (error: mongoDB.MongoServerError) => {
         if (error.codeName === 'NamespaceNotFound') {
             await db.createCollection(process.env.SUPERHEROES_COLLECTION_NAME || '', {validator: jsonSuperheroSchema});
         }
     });
}