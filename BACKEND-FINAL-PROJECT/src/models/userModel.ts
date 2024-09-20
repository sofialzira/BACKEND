import IUser from "../interfaces/userInterface.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    },
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

