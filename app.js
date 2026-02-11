const express = require('express');
const app = express();
const port = 3000;
const shoppingList = require('./appp');
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