import mongoose, { model } from 'mongoose';

const UserSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: "thisCollection",
});

export default mongoose.model('User', UserSchema);