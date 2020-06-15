import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "First Name is required"]
    },
    last_name: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        validate: {
            validator: email => User.doesNotExist({email}),
            message: "This email is already subscribed to this mailing list"
        },
        required: [true, "Email is required"]
    },
    permissionLevel: Number
},
{
    collection: 'email list',
});

userSchema.statics.doesNotExist = async function(field){
    return await this.where(field).countDocuments() === 0;
}

const User = mongoose.model('',userSchema);
export default User;
