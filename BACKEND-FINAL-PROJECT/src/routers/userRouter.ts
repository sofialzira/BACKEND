import { NextFunction, Router } from 'express';
import UserController from "../controllers/userController.js";
import { body, check, validationResult } from 'express-validator';
import { checkRole } from "../middlewares/authMiddleware.js";



const router: Router = Router();

router.get('/users', checkRole (["ADMIN", "USER"]), UserController.getAll);
router.get('/users/:id', UserController.getUserById);
router.post('/users/register', [
    check("username").notEmpty().withMessage("Username is required."),
    check("email").isEmail().withMessage("Invalid email format."),
    check("password").isStrongPassword(),
    check("role").isIn(["USER", "ADMIN"]).withMessage("Invalid role."),
], UserController.register);


router.post('/users/login', UserController.login);
// router.put();
// router.delete();


export default router;

