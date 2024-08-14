import {successGoogleLogin ,failureGoogleLogin } from "../controllers/google.auth.controller"

import { Router } from "express";
const router = Router();
import verifyJWT from "../middlewares/auth.middleware.js"


const passport = require('passport'); 
require('../passport');

router.use(passport.initialize()); 
router.use(passport.session());

const userController = require('../controllers/userController');

router.get('/', userController.loadAuth);

// Auth 
router.get('/auth/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
})); 

router.get( '/auth/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/success', 
		failureRedirect: '/failure'
}));

router.route('/success' ,successGoogleLogin); 

router.get('/failure' , failureGoogleLogin);

export default router;
