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

export async function changeStorage (req, res) {
    const { cart } = req.body;
    try {
        const semEstoque = await productsCollection.findOne({stored: 0});
        const temNoCarrinho = cart.filter((item) => {
            return semEstoque.name === item.name;
        })
        if(temNoCarrinho.length === 0){
            cart.forEach(async (item) => {
                const {quantity, name} = item;
                try {
                    const product = await productsCollection.findOne({name});
                    const {stored} = product;
                    const newQuantity = stored - quantity;
                    if(newQuantity < 0) return res.send('Produto indisponível no estoque');
                    await productsCollection.updateOne({name}, {$set: {stored: newQuantity}});
                    console.log(newQuantity)
                    res.sendStatus(200);
                } catch (error) {
                    res.sendStatus(404);
                }
            })
        } else {
            res.send('Produto indisponível no estoque');
        }
    } catch(e) {
        res.send('erro');
    }
}