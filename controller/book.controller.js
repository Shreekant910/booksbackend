const db = require('../db/index');
const { booksTable } = require('../modal/book.modal');
const { eq , like , sql } = require('drizzle-orm');
const { authorsTable } = require('../modal/author.modal');


exports.getallBooks = async (req, res) => {
    try {
        const { search } = req.query;
        console.log("Search query:", search);
        if(search){
            const books = await db.select().from(booksTable).where(like(booksTable.title, `%${search}%`));
            return res.json(books);
        }

        const books = await db.select().from(booksTable);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookId= async (req,res)=>{
    const bookid = req.params.id;
        const [book] = await db.select().from(booksTable).where(eq(booksTable.id, bookid)).leftJoin(authorsTable,eq(booksTable.authorid,authorsTable.id));
        if(book){
            res.json(book);
        }else{
            res.status(400).json({message: "Book not found"});
        }
}

exports.addNewBook = async (req,res)=>{
     const {title,authorid,description} = req.body;
        if(!title || title.trim() === ''){
            return res.status(400).json({message: "Title is required"});
        }
       const [result] = await db.insert(booksTable).values({
        title: title,
        authorid: authorid,
        description: description
       });

        
        res.status(201).json({message: "New book added", id: result.id});
}

exports.deleteBookId = async (req,res)=>{
       console.log("Delete request received");
        const bookid = req.params.id;
        const book = await db.select().from(booksTable).where(eq(booksTable.id, bookid));
        if(book){
            await db.delete(booksTable).where(eq(booksTable.id, bookid));
            res.json({message: "Book deleted successfully"});
        }else{
            res.status(400).json({message: "Book not found"});
        }
}
