const app=require('./app');
const request = require('supertest');
const shoppingList = require('./appp');
describe('Tests de l\'API de la liste de courses', () => {
    beforeEach(() => {
        shoppingList.deleteall();
    });
    //test pour verfier que le rerourne un tab vide
    test('GET /api/items - should return an empty array', async () => {
        const response=await request(app).get('/api/items');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
    //test pour ajouter item
    test('POST /api/items - should add an item to the list',async() =>{
        const response=await request(app).post('/api/items').send({item:'Marwa'});
        expect(response.status).toBe(200);
        expect(response.body).toEqual(['Marwa']);
    });
    //test pour supprimer tous items
    test('DELETE /api/items - should delete all items from the list', async() =>{
        shoppingList.additem('Marwa');
        const response=await request(app).delete('/api/items');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
    //test pour compter les items
    test('GET /api/items/count - should return the count of items in the list', async() =>{
        shoppingList.additem('Marwa');
        shoppingList.additem('not');
        const response=await request(app).get('/api/items/count');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({count:2});
    });
}
)
