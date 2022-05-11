import db from "./../db.js";
import { ObjectId } from 'mongodb';

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

export async function getProductId (req, res) {
    const { id } = req.params;
    try {
        const existeProduto = await productsCollection.findOne({_id: new ObjectId(id)});
        if(!existeProduto) return res.status(404).send('Produto não existe');
        
        res.send(existeProduto);
    } catch (err) {
        res.send(err);
    }
}