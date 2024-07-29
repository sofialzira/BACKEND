import { IUser } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const usersJsonPath: string = './src/data/users.json';

class UserService {
  private readUsersJson(): IUser[] | undefined {
    try {
      const data = JsonFileReader.read(usersJsonPath);
      return data;
    } catch (error) {
      throw new Error('Failed to read users from file');
    }
  }

  private writeUsersJson(users: IUser[]): void {
    try {
        JsonFileReader.write(usersJsonPath, users);

    } catch (error) {
        throw new Error('Failed to write users to file');
    }
  }

  getAll = (): IUser[] | undefined => {
    try {
      return this.readUsersJson();
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  getUserById = (userId: string): IUser | undefined => {
    try {
      const users: IUser[] | undefined = this.readUsersJson();
      const foundUser = users?.find(user => user.id === userId);
      return foundUser;
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  }

  register = async (newUser: IUser): Promise<IUser> => {
    try {
        const users: IUser[] | undefined = this.readUsersJson();
        if(!users) {
            throw new Error ('failed to read users');
        }

        
        newUser.id = uuidv4();
        newUser.password = await bcrypt.hash(newUser.password, 7)
        users?.push(newUser);
        this.writeUsersJson(users);

        return newUser;

    } catch (error) {
        throw new Error('Failed to create user');
    }
  }

  update = async () => {
    try {

    } catch (error) {
      // console.log(error);
    }
  }

  delete = async () => {
    try {

    } catch (error) {
      // console.log(error);
    }
  }
}

export default new UserService();