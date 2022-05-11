import bcrypt from "bcrypt";

import db from "./../db.js";
const usersCollection = db.collection("usersCollection");

export async function signInValidation (req, res, next){
  const {email, password} = req.body;
  const user = await usersCollection.findOne({email});      
  if(!user){
    return res.status(404);
  }
  if(bcrypt.compareSync(password, user.password)){
    res.locals.user = user;
  }
  else{
    return res.send("Erro")
  }
  next();
}