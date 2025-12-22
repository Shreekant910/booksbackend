const express = require('express');
const app = express();
const port = 8000;
const routes = require('./routes/routes');
const logger = require('./middleware/logger');
app.use(express.json());

app.use('/books',logger,routes)


 app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})