import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true }
);

// This check prevents re-defining the model during hot reloads
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;