const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const userModel = new UserModel();

class UserController {
    constructor() {}
    
    async registerUser(req, res) {
        try {
            const { username, email, password } = req.body;
            

            const existingUser = await userModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({
                    message: 'Username already exists',
                    error: 'User registration failed'
                });
            }
            

            if (password.length < 6) {
                return res.status(400).json({
                    message: 'Password must be at least 6 characters long',
                    error: 'User registration failed'
                });
            }

            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
            if (!passwordPattern.test(password)) {
                return res.status(400).json({
                    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
                    error: 'User registration failed'
                });
            }
        
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