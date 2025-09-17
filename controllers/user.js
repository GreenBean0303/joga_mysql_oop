const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const userModel = new UserModel();

class UserController {
    constructor() {}
    
    async registerUser(req, res) {
        try {
            const { username, email, password, role = 'user' } = req.body; 
            
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
            
            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({
                    message: 'Invalid role. Must be either "user" or "admin"',
                    error: 'User registration failed'
                });
            }
        
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const newUser = {
                username: username,
                email: email,
                password: hashedPassword,
                role: role
            };
            
            const userId = await userModel.create(newUser);
            
            req.session.user = {
                id: userId,
                username: username,
                email: email,
                role: role 
            };
            
            res.status(201).json({
                message: `User ${username} registered successfully with id ${userId}`,
                user: {
                    id: userId,
                    username: username,
                    email: email,
                    role: role 
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
    
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            
            const user = await userModel.findByUsername(username);
            
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid username or password',
                    error: 'Login failed'
                });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Invalid username or password',
                    error: 'Login failed'
                });
            }
            
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role 
            };
            
            res.status(200).json({
                message: `User ${username} logged in successfully`,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role 
                },
                session: req.session.user
            });
            
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({
                message: 'Error logging in user',
                error: error.message
            });
        }
    }
    
    async getUsersByRole(req, res) {
        try {
            const { role } = req.params;
            
            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({
                    message: 'Invalid role. Must be either "user" or "admin"'
                });
            }
            
            const users = await userModel.findByRole(role);
            
            res.status(200).json({
                message: `Found ${users.length} users with role: ${role}`,
                users: users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }))
            });
            
        } catch (error) {
            console.error('Error finding users by role:', error);
            res.status(500).json({
                message: 'Error finding users by role',
                error: error.message
            });
        }
    }
}

module.exports = UserController;