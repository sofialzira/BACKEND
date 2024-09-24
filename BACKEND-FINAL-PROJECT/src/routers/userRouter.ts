import { NextFunction, Router } from 'express';
import UserController from "../controllers/userController.js";
import { body, check, validationResult } from 'express-validator';
import { checkRole } from "../middlewares/authMiddleware.js";



const router: Router = Router();

router.get('/users', checkRole (["ADMIN"]), UserController.getAll);
router.get('/users/:id', UserController.getUserById);
router.post('/users/register', [
    check("username").notEmpty().withMessage("Username is required."),
    check("email").isEmail().withMessage("Invalid email format."),
    check("password").isStrongPassword(),
    check("role").isIn(["USER", "ADMIN"]).withMessage("Invalid role."),
], UserController.register);
router.post('/users/login', [
    check("email").isEmail().withMessage("Invalid email format."),
    check("password").notEmpty().withMessage("Password is required.")
], UserController.login);

 router.put('/users/:id', checkRole(["ADMIN"]), UserController.update);
 router.delete('/users/:id', checkRole([ "ADMIN"]), UserController.delete);


export default router;

