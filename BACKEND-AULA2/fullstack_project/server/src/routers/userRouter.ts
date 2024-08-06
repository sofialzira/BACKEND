import { NextFunction, Router } from "express";
import UserController from "../controllers/userController.js";
import { check, validationResult } from 'express-validator';
import { ExpressValidator } from "express-validator";
import userController from "../controllers/userController.js";

const router: Router = Router();


// get all users 
router.get('/users', UserController.getAll);


// get user by id 
router.get('/users/:id', UserController.getUserById);


// register a new user 
router.post('/users/register', [
    check("name").notEmpty().withMessage("User name is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").isStrongPassword(),
    check("role").isIn(["USER", "ADMIN", "GUEST"]).withMessage("Invalid rode")   
], UserController.register);


// login user 
router.post('/users/login', [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required")
], UserController.login);


// update existing user
router.put('/users/:id', UserController.update);
    

// delete user 
router.delete('/users/:id', UserController.delete);






export default router;



