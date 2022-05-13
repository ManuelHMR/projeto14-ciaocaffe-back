import express from "express";

import db from "./../db.js";
const salesCollection = db.collection("salesCollection");

export async function salesPost (req, res) {
    const {sale} = res.locals;
    try{
        await salesCollection.insertOne(sale)
        res.send("Venda confirmada!")
    } catch (err){
        res.send(err)
    };
};