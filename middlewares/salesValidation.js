import { ObjectId } from "mongodb";

import db from "./../db.js";
const usersCollection = db.collection("usersCollection");
const sessionsCollection = db.collection("sessionsCollection");

export async function salesValidation (req, res, next){
    const {adress, cart, total, userId} = req.body;
    const token = req.headers.token.replace(/"/g,"").trim();
    try{
        const session = await sessionsCollection.findOne({token});
        const user = await usersCollection.findOne({_id: new ObjectId(userId)});    
        if(!user){
            return res.status(404);
        }
        delete user.password;
        const sale = {adress, cart, total, user};
        res.locals.sale = sale;
    }catch (err){
        res.send(err);
    }
    next();
};