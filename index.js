const express = require('express');
const app = express();
const port = 8000;
const routes = require('./routes/routes');
const logger = require('./middleware/logger');
const authorroutes = require('./routes/author.routes');
app.use(express.json());


app.use('/books',logger,routes)
app.use('/authors',logger,authorroutes)


 app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})