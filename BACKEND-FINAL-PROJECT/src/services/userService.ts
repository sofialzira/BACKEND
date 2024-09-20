import  IUser from '../interfaces/userInterface.js';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fileService from '../utils/fileService.js';

dotenv.config();

class UserService {
    async getAll(): Promise<IUser[]> {
        try {
          return await UserModel.find();
        } catch (error) {
          throw new Error('Failed to get all users');
        }
      }

      async getUserById(userId: string): Promise<IUser | null> {
        try {
          
          const foundUser: IUser | null = await UserModel.findById(userId);
          
          return foundUser;
        } catch (error) {
          throw new Error('Failed to get user by ID');
        }
      }
      
      async register(newUser: IUser): Promise<IUser> {
        try {
            const foundUser = await UserModel.findOne({ email: newUser.email });
    
            if(foundUser) { 
              throw new Error('Email already exists');
            }
    
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashedPassword;
    
            const registerUser = await UserModel.create(newUser);
             console.log(registerUser);
    
            return registerUser;
    
        } catch (error) {
            throw new Error('Failed to create user');
        }
      }

      async login(email: string, password: string): Promise<{ user: IUser, accessToken: string } | null> {
        try {
            const foundUser = await UserModel.findOne({ email: email });
    
            if(!foundUser) { 
              return null;
            }
    
            if (!await bcrypt.compare(password, foundUser.password)) {
              return null;
            }
    
            let token = "";
    
            if(process.env.SECRET_KEY) {
    
              token = jwt.sign({
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role
              }, process.env.SECRET_KEY);
              
            } else {
              throw new Error ('Cannot get secret key');
            }
           
            return {user: foundUser, accessToken: token};
        } catch (error) {
            throw new Error('Failed to create user');
        }
      }

}

export default new UserService();