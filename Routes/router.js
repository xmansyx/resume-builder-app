const express = require('express');
const userController = require('../controllers/UserController');
const resumeController = require('../controllers/ResumeController');
const authController = require('../controllers/AuthController');

const router = express.Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");


// Sign up a new user
router.post('/signup', authController.signup);

// Sign in an existing user
router.post('/authenticate', authController.signin);

// User routes
router.get('/users/:id', authMiddleware.verifyJWT, authMiddleware.isOwner, userController.getUser);
router.put('/users/:id', authMiddleware.verifyJWT, authMiddleware.isOwner, userController.updateUser);
router.delete('/users/:id', authMiddleware.verifyJWT, authMiddleware.isOwner, userController.deleteUser);

// Resume routes
router.get('/resumes', authMiddleware.verifyJWT, resumeController.getResumes);
router.post('/resumes', authMiddleware.verifyJWT, resumeController.createResume);
router.get('/resumes/:id', authMiddleware.verifyJWT, resumeController.getResume);
router.put('/resumes/:id', authMiddleware.verifyJWT, resumeController.updateResume);
router.delete('/resumes/:id', authMiddleware.verifyJWT, resumeController.deleteResume);

module.exports = router;
