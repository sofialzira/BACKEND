import { Request, Response } from "express";
import { IUser } from "../interfaces/interfaces.js";
import userService from "../services/userService.js"

const usersFilePath = './src/data/users.json';

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
            const user: IUser | undefined = userService.getUserById(userId);

            if(!user) {
                res.status(404).json({error: 'user not found'});
            }

            res.json(user);

        } catch (error) {
            res.status(500).json({ error: 'failed to get user' });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const userToCreate: IUser = req.body;
            const createUser = await userService.register(userToCreate);
            res.status(201).json(createUser);

        } catch (error) {
            res.status(500).json({ error: 'failed to create user' });
        } 
    }

    update = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500).json({ error: 'failed to update product' });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500).json({ error: 'failed to delete product' });
        }
    }
}

export default new UserController();

