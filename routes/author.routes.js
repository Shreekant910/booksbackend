const express = require('express');
const authorroutes = express.Router();
const {authorsTable} = require('../modal/author.modal');  
const db = require('../db/index');
const { booksTable } = require('../modal/book.modal');
const { eq, sql } = require('drizzle-orm');

authorroutes.get('/getAllAuthor', async(req, res) => {
try{
    const result = await db.select().from(authorsTable);
    res.json(result);
}
catch(error){
    res.status(500).json({error: error.message});
}
});

authorroutes.get('/getAllAuthor/:id', async(req, res) => {
    const authorId = req.params.id;
    try {
        const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, authorId));
        if(author){
            res.json(author);
        }else{
            res.status(404).json({message: "Author not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }});


authorroutes.post('/addAuthor', async(req, res) => {
    const {firstname,lastName ,email} = req.body;
    try{
        await db.insert(authorsTable).values({
            firstname: firstname,
            lastName: lastName,
            email: email
        });

        const idResult = await db.execute(sql`SELECT LAST_INSERT_ID() AS id`);
        const newId = idResult && idResult[0] ? idResult[0].id : null;

        res.status(201).json({message: "Author added successfully", id: newId, firstname: firstname, lastName: lastName, email: email});     
    }catch (error) {
        res.status(500).json({error: error.message});
    }
});


authorroutes.get('/:id/books', async (req, res) => {
    const authorId = req.params.id;
    try {
        const books = await db.select().from(booksTable).where(eq(booksTable.authorid, authorId));
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
});

module.exports = authorroutes;