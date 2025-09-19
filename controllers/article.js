const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    constructor() { 
        const article = []
    }
    
    async getAllArticles(req, res) { 
        const articles = await articleModel.findAll();
        
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(200).json({articles: articles});
        } else {
            res.render('articles/index', {
                pageTitle: 'Kõik Artiklid',
                articles: articles,
                user: req.session.user
            });
        }
    }
    
    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(200).json({article: article});
        } else {
            res.render('articles/show', {
                pageTitle: article ? article.name : 'Artiklit ei leitud',
                article: article,
                user: req.session.user
            });
        }
    }
    
    // artikli loomise vormi kuvamine
    showCreateForm(req, res) {
        res.render('articles/create', {
            pageTitle: 'Lisa uus artikkel',
            user: req.session.user
        });
    }
    
    // artikli muutmise vormi kuvamine
    async showEditForm(req, res) {
        try {
            const article = await articleModel.findById(req.params.id);
            if (!article) {
                return res.status(404).render('404', {
                    pageTitle: 'Artiklit ei leitud',
                    user: req.session.user
                });
            }
            res.render('articles/edit', {
                pageTitle: 'Muuda artiklit',
                article: article,
                user: req.session.user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    // loo uus article
    async createNewArticle(req, res) {
        try {
            const newArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            };
            
            const articleId = await articleModel.create(newArticle);
            
            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                res.status(201).json({ 
                    message: `create article with id ${articleId}`, 
                    article: {id: articleId, ...newArticle}     
                });
            } else {
                
                res.redirect(`/article/${newArticle.slug}`);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    // uuenda olemasolevat article
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
            
            if (result > 0) {
                if (req.headers.accept && req.headers.accept.includes('application/json')) {
                    res.status(200).json({ 
                        message: `Article with id ${articleId} updated successfully`, 
                        affectedRows: result
                    });
                } else {
                    
                    res.redirect(`/article/${articleData.slug}`);
                }
            } else {
                res.status(404).json({ 
                    message: `Article with id ${articleId} not found` 
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating article', error: error.message });
        }
    }
    
    // kustuta article
    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;
            const result = await articleModel.delete(articleId);
            
            if (result > 0) {
                if (req.headers.accept && req.headers.accept.includes('application/json')) {
                    res.status(200).json({ 
                        message: `Article with id ${articleId} deleted successfully`, 
                        affectedRows: result
                    });
                } else {
                    
                    res.redirect('/');
                }
            } else {
                res.status(404).json({ 
                    message: `Article with id ${articleId} not found` 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                message: 'Error deleting article', 
                error: error.message 
            });
        }
    }
}

module.exports = articleController;