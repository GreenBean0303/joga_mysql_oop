const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
    constructor() {
        super('user');
    }
    
    async findAll() {
        const users = await super.findAll();
        return users;
    }
    
    async findOne(field, value) {
        const user = await super.findOne(field, value);
        return user;
    }
    
    async findByUsername(username) {
        const user = await super.findOne('username', username);
        return user;
    }
    
    async create(userData) {
        const createdUserId = await super.create(userData);
        return createdUserId;
    }
    
    async update(id, userData) {
        const updatedUserId = await super.update(id, userData);
        return updatedUserId;
    }
    
    async delete(id) {
        const deletedRows = await super.delete(id);
        return deletedRows;
    }
}

module.exports = UserModel;