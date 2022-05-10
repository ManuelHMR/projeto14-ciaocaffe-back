import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
const db = mongoClient.db(process.env.DB);

export default db;