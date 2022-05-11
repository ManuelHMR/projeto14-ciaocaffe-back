import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try{
    await mongoClient.connect();
    db = mongoClient.db(process.env.DB);
} catch (err) {
    console.log("Erro ao conectar com o banco de dados");
}


export default db;