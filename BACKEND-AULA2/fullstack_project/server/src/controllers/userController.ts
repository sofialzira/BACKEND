import { Request, Response } from "express";
import { IUser } from '../models/userModel.js';
import userService from "../services/userService.js"
import { validationResult } from 'express-validator';

// const usersFilePath = './src/data/users.json';

class UserController {
  
    getAll = async (req: Request, res: Response) => {
        try {
            const users: IUser[] | undefined = await userService.getAll();

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'failed to get user' });
        }
    }

    getUserById = async (req: Request, res: Response) => {
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

    register = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            const avatar = req.files?.avatar;

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

    login = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            };

            const {email, password} = req.body;

            const foundUser: any = await userService.login(email, password);
            if(foundUser === null) {
                return res.status(404).json({error: 'Invalid email or password'});
            }
           res.json(foundUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        } 
    }



    update = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;
            const userToUpdate: IUser = req.body;
            const updatedUser = await userService.update(userId, userToUpdate);

            if(!updatedUser) {
                res.status(404).json( {error: 'User not found'});
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'failed to update user' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;
            const deletedUser = await userService.delete(userId);

            if(!deletedUser) {
                res.status(404).json ( {error: 'User not found'});
            }
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json({ error: 'failed to delete user'});
        }
    }
}

export default new UserController();

