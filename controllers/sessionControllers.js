import joi from 'joi'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from "./../db.js";
const sessionsCollection = db.collection("sessionsCollection");
dotenv.config();

export async function signIn (req, res) {
    try{
        const user = res.locals.user;
        const data = {  userId: user._id }

        const secretKey = process.env.JWT_SECRET;
        const config = { expiresIn: 60*60*24*7 }
        const token = jwt.sign(data, secretKey, config);

        await sessionsCollection.insertOne(token);
        res.send(token)
    } catch (err){
        res.send(err)
    };
};

export async function signUp (req, res) {
    const schemaSignUp = joi.object({
        name: joi.string().trim().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().trim().required(),
        confirmPassword: joi.string().required().valid(joi.ref('password'))
    }) 

    const validation = schemaSignUp.validate(req.body, {abortEarly:false});
    if(validation.error){
        console.log(validation.error.details.map((e) => e.message));
        return res.status(422).send("Dados Inválidos");
    } 

    const {name, email, password} = req.body;
    try{
        const existeUsuario = await db.collection('usersCollection').findOne({email});
        if(existeUsuario) return res.status(409).send('Usuário já existe!');

        const passwordHash = bcrypt.hashSync(password, 10);

        await db.collection('usersCollection').insertOne({name, email, password: passwordHash});

        res.sendStatus(201);
    } catch (err){
        res.send(err);
    };
};

export async function signOut(req, res){
    const {token} = req.headers;
    /*const secretKey = process.env.JWT_SECRET;*/
    try{
        /*jwt.verify(token, secretKey);*/

        const session = await sessionsCollection.findOne({token});
        if(!session){
            return res.send("Não foi possível localizar a sessão!");
        }
        await sessionsCollection.deleteOne({token});
        res.send("Sessão encerrada!");
    }catch(err){
        res.send(err)
    }  
};