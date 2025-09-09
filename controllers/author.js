const authorDbModel = require('../models/author');
const articleModel = require('../models/article');

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();


class authorController {
    constructor() { 
        const author =[] 
    }

    async getAuthorById(req, res) {
        const author = await authorModel.findById(req.params.id);
        const articles = await articleModel.findMany(author)
        author['articles'] = articles
        res.stattus(201).json({author: author});
    } 
}

module.exports = authorController;