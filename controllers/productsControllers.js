import db from "./../db.js";

const productsCollection = db.collection("productsCollection");

export async function getProducts (req, res) {
    try{
        const productsArray = await productsCollection.find({}).toArray();
        console.log(productsArray);
        res.send(productsArray).status(200);
    } catch (err){
        res.send(err)
    };
};