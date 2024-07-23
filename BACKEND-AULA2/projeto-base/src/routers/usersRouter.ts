import { Router } from "express";
import UsersController from "../controllers/usersController.js";

const router: Router = Router();
 
// get all users 
router.get('/users', UsersController.getAll);


// get user by id 
router.get('/users/:id', UsersController.getOne);


// create new user 
router.post('/users', UsersController.create);


// update existing user

router.put('/users/:id', UsersController.update);
    

// delete user 

router.delete('/users/:id', UsersController.delete);






export default router;



