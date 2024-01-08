import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    shape: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});
const NewUser = mongoose.model("NewUser", userSchema)
export default NewUser;