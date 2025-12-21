const express = require('express');
const routes = express.Router();
const books = require('../book');



routes.get('/allbooks', (req, res) => {
    res.json(books);
});

routes.get('/allbooks/:id', (req, res) => {
    const bookid = parseInt(req.params.id);
    const book = books.find(b=>b.id === bookid);
    if(book){
        res.json(book);
    }else{
        res.status(400).json({message: "Book not found"});
    }
});

routes.post('/newbook',(req,res)=>{
    const {title,author} = req.body;
    if(!title || title.trim() === ''){
        return res.status(400).json({message: "Title is required"});
    }
    if(!author || author.trim() === ''){
        return res.status(400).json({message: "Author is required"});
    }
    const id = books.length+1;
    const newbook = {id,title,author};
    books.push(newbook);
    res.json({message: "New book added", book: newbook});
})
   
module.exports = routes;

