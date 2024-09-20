import { NextFunction, Router } from "express";
import UserController from "../controllers/userController.js";
import { check, validationResult } from 'express-validator';
import { ExpressValidator } from "express-validator";

import { checkRole } from "../middlewares/authMiddleware.js";

const router: Router = Router();


// get all users 
router.get('/users', checkRole(["ADMIM", "USER"]), UserController.getAll);


// get user by id 
router.get('/users/:id', UserController.getUserById);


// register a new user 
router.post('/users/register', [
    check("name").notEmpty().withMessage("User name is required."),
    check("email").isEmail().withMessage("Invalid email format."),
    check("password").isStrongPassword(),
    check("role").isIn(["USER", "ADMIN", "GUEST"]).withMessage("Invalid role."),
    check("avatarFile").custom((value, {req}) => {
        if (!req.files || !req.files.avatarFile) {
            throw new Error('Avatar is required.')
        }

        const avatar = req.files.avatarFile;

        const allowedMimes = ['image/jpeg', 'image/png'];

        if (!allowedMimes.includes(avatar.mimetype)) {
            throw new Error('Invalid image format. Only JPEG or PNG are allowed.');
        }

        if (avatar.size > 5 * 1024 * 1024) { // 5 MB
            throw new Error('Image size exeeds the max limit of 5MB.');
        }

        return true;
    })
], UserController.register);


// login user 
router.post('/users/login', [
    check("email").isEmail().withMessage("Invalid email format."),
    check("password").notEmpty().withMessage("Password is required.")
], UserController.login);


// update existing user
router.put('/users/:id', checkRole(["ADMIM", "USER"]), UserController.update);
    

// delete user 
router.delete('/users/:id', checkRole(["ADMIN"]), UserController.delete);






export default router;



