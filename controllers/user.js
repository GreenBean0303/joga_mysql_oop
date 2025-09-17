const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const userModel = new UserModel();

class UserController {
    constructor() {}
    
    async registerUser(req, res) {
        try {
            const { username, email, password } = req.body;
            
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const newUser = {
                username: username,
                email: email,
                password: hashedPassword
            };
            
            const userId = await userModel.create(newUser);
            
            req.session.user = {
                id: userId,
                username: username,
                email: email
            };
            
            res.status(201).json({
                message: `User ${username} registered successfully with id ${userId}`,
                user: {
                    id: userId,
                    username: username,
                    email: email
                }
            });
            
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({
                message: 'Error registering user',
                error: error.message
            });
        }
    }
}

module.exports = UserController;