import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true }

});

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
}

export default mongoose.model<IUser>("User", UserSchema);