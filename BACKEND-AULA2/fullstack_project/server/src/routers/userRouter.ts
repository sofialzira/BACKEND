import { Router } from "express";
import UserController from "../controllers/userController.js";

const router: Router = Router();
 
// get all users 
router.get('/users', UserController.getAll);


// get user by id 
router.get('/users/:id', UserController.getUserById);


// create new user 
router.post('/users', UserController.register);


// update existing user

router.put('/users/:id', UserController.update);
    

// delete user 

router.delete('/users/:id', UserController.delete);






export default router;



