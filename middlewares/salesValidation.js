import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from "./../db.js";
const usersCollection = db.collection("usersCollection");
dotenv.config();

export async function salesValidation (req, res, next){
    const {cep, street, number, neighbourhood, city, state, cart, total} = req.body;
    const secretKey = process.env.JWT_SECRET;
    try{
        const token = req.headers.token.replace(/"/g,"").trim();
        const data = jwt.verify(token, secretKey);
        const user = await usersCollection.findOne({_id: new ObjectId(data.userId)});    
        if(!user){
            return res.status(404);
        }
        delete user.password;
        const sale = {cep, street, number, neighbourhood, city, state, cart, total, user};
        res.locals.sale = sale;
    }catch (err){
        res.send(err);
    }
    next();
};