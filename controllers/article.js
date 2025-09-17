const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    constructor() { 
        const article =[] 
    }

    async getAllArticles(req, res) { 
        const articles = await articleModel.findAll();
        res.status(201).json({articles: articles});
    } 

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        res.status(201).json({article: article});
    }



    async createNewArticle(req, res) {
        const newArticle ={
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        };
        const articleId = await articleModel.create(newArticle);
        res.status(201).json({ 
            message: `create article with id ${articleId}`, 
            article:{id: articleId, ...newArticle}     
        });
    } 

    async updateArticle(req, res) {
        try {
        const articleId = req.params.id;
        const articleData = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author_id
        };

        const result = await articleModel.update(articleId, articleData);
        if (result >0) {
            res.status(201).json({ 
                message: `Article with id ${articleId} updated successfully`, 
                affectRows: result
            });
        }
    }  
    catch (error) {
        res.status(500).json({ message: 'Error updating article', error: error.message });
    }
    }

}

module.exports = articleController;