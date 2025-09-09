const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
  constructor() {
    super('article'); 
  }
  async findAll() {
    const articles = await super.findAll();
    return articles;
  }

  async findOne(slug) {
    const articles = await super.findOne('slug', slug);
    return articles;
  }

}

module.exports = ArticleModel;