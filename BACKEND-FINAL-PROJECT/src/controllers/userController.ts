import { Request, Response, NextFunction}  from 'express';
import IUser from '../interfaces/userInterface.js';
import userService from '../services/userService.js';
import { validationResult } from 'express-validator';

class UserController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
          const users: IUser[] | undefined = await userService.getAll();
          
          res.json(users);
        } catch (error) {
            res.status(500).json( { error: 'failed to get users'} );
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const userId: string = req.params.id;
            const user: IUser | null = await userService.getUserById(userId);

            if(!user) {
              return res.status(404).json({error: 'user not found'});
            }

            res.json(user);

        } catch (error) {
            res.status(500).json({ error: 'failed to get user' });
        }
    }
    
    async register(req: Request, res: Response) {
        try {
            console.log("BAM")
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            };

            const userToCreate: IUser = req.body;
            const createUser = await userService.register(userToCreate);
            res.status(201).json(createUser);

        } catch (error) {
            res.status(500).json({ error: 'failed to create user' });
        } 
    }

    async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            };

            const {email, password} = req.body;

            const foundUserWithToken: any = await userService.login(email, password);
            if(foundUserWithToken === null) {
                return res.status(404).json({error: 'Invalid email or password'});
            }
           res.json(foundUserWithToken);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        } 
    }

}

export default new UserController();