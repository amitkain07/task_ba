import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 40
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6 
    },
    profilePic : {
        type: String
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const User = mongoose.model("user", UserSchema);
export default User;
