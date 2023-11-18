import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['F', 'M']},
    role: { type: String, enum: ['usuario', 'admin']},
    avatar: String,
    userValidated: { type: Boolean, required: true, default: false }
})

export default mongoose.model('User', UserSchema)