import { NextFunction, Router } from "express";
import UserController from "../controllers/userController.js";
import { check, validationResult } from 'express-validator';
import { ExpressValidator } from "express-validator";

const router: Router = Router();

const validateUser = [
    check("name").notEmpty().withMessage("User name is required"),
    check("email").notEmpty().withMessage("User email is required"),
    check("password").notEmpty().withMessage("User password is required")
]
 
// get all users 
router.get('/users', UserController.getAll);


// get user by id 
router.get('/users/:id', UserController.getUserById);


// create new user 
router.post('/users', validateUser, UserController.register);


// update existing user

router.put('/users/:id', UserController.update);
    

// delete user 

router.delete('/users/:id', UserController.delete);






export default router;



