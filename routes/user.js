const express = require('express');
const router = express.Router();
const UserControllerClass = require('../controllers/user');
const userController = new UserControllerClass();

router.post('/user/register', (req, res) => userController.registerUser(req, res));
router.post('/user/login', (req, res) => userController.loginUser(req, res));
router.get('/users/role/:role', (req, res) => userController.getUsersByRole(req, res));

module.exports = router;