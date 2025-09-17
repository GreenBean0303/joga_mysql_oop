const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session'); 

const app = express();

app.use(sessions({
    secret: 'your-secret-key-here',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const articleControllerClass = require('./controllers/article');
const articleController = new articleControllerClass();
const articleRoutes = require('./routes/article');
const authorRoutes = require('./routes/author');
const userRoutes = require('./routes/user');

app.use('/', articleRoutes);       
app.use('/author', authorRoutes);   
app.use('/', userRoutes);

app.listen(3026, () => {
    console.log('Server running on http://localhost:3026');
});