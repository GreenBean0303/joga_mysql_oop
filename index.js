const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session'); 
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    extname: '.handlebars',
    helpers: {
        eq: function(a, b) {
            return a === b;
        },
        formatDate: function(date) {
            if (!date) return '';
            return new Date(date).toLocaleDateString('et-EE');
        },

        truncate: function(text, length = 150) {
            if (!text) return '';
            if (text.length <= length) return text;
            return text.substring(0, length) + '...';
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(sessions({
    secret: 'your-secret-key-here',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const articleRoutes = require('./routes/article');
const authorRoutes = require('./routes/author');
const userRoutes = require('./routes/user');

app.use('/', articleRoutes);       
app.use('/author', authorRoutes);   
app.use('/', userRoutes);

app.listen(3026, () => {
    console.log('Server running on http://localhost:3026');
});