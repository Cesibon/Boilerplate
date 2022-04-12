const express = require('express');
const router = express.Router();

/**
 * Middlewares
 *************/
 const {userMiddleware} = require('@app/controllers/user.controller')
/**
 * Controllers
 *************/
const userController = require('@app/controllers/user.controller')

/**
 * Routes
 ********/

// Get users
router.get('/users/', userController.usersGet);
// Get user
router.get('/users/:userid', userMiddleware, userController.userGet);
// Get user projects
router.get('/users/:userid/projects', userMiddleware, userController.userGetProjects);

// create user
router.post('/users/', userController.userCreate);
// Update user
router.put('/users/:userid', userMiddleware, userController.userUpdate);
// Delete the user
router.delete('/users/:userid', userMiddleware, userController.userDelete);



module.exports = router;