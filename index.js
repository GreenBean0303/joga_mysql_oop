const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const articleControllerClass = require('./controllers/article');
const articleController = new articleControllerClass();

const articleRoutes = require('./routes/article');
const authorRoutes = require('./routes/author');


app.use('/', articleRoutes);       
app.use('/author', authorRoutes);   

app.listen(3026, () => {
    console.log('Server running on http://localhost:3026');
});