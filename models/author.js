const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
  constructor() {
    super('author'); 
  }
  async findAll() {
    const authors = await super.findAll();
    return authors;
  }

  async findOne(slug) {
    const authors = await super.findOne('slug', slug);
    return authors;
  }

}

module.exports = AuthorModel;