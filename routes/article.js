const express = require('express');
const router = express.Router();
const articleControllerClass = require('../controllers/article');
const articleController = new articleControllerClass();


router.get('/articles', (req,res) => articleController.getAllArticles(req,res));
router.get('/articles/:slug', (req,res) => articleController.getArticleBySlug(req,res));
router.get('/', (req,res) => articleController.getAllArticles(req,res));
router.get('/article/:slug', (req,res) => articleController.getArticleBySlug(req,res));


router.get('/article/create/form', (req,res) => articleController.showCreateForm(req,res));
router.get('/article/edit/:id', (req,res) => articleController.showEditForm(req,res));


router.post('/article/create', (req,res) => articleController.createNewArticle(req,res));
router.put('/article/edit/:id', (req,res) => articleController.updateArticle(req,res));
router.delete('/article/delete/:id', (req,res) => articleController.deleteArticle(req,res));

module.exports = router;