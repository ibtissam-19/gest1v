require('dotenv').config();
const express = require('express');
const app = express();
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
console.log(`Le serveur utilise la clé : ${apiKey}`);
const shoppingList = require('./appp');
const config = require('./config');
console.log(config.apiKey);
app.use(express.json());
app.use(express.static('public'));
app.get('/api/items',(req,res)=>{
    res.json(shoppingList.getALL())
})
app.post('/api/items', (req,res)=>{
    try{
        const item = req.body.item;
        if(!item) return res.status(400).json({error:'Item is required'})
        const items = shoppingList.additem(item);
        res.json(items);
    }
    catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
})
app.delete('/api/items',(req,res)=>{
    try{
        const items = shoppingList.deleteall();
        res.json(items);
    }
    catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
})
app.get('/api/items/count',(req,res)=>{
    try{
        const count = shoppingList.countitem();     
        res.json({count});
    }
    catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
})
// Export the app for testing. When run directly, start the server.
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;