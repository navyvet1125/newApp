// create mongoose schema for user that utilizes bcrypt.  The model has  fields for name, location, and avatar.  Required are name, email (which is unique), and username (which is also unique).  Include a field to track time created, last updated, and whether or not the user is logged in.

// Path: auth/server/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    location: {type: String},
    avatar: {type: String},
    role: {type: String, default: 'guest'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    logged_in: {type: Boolean, default: false}
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
}
);

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}
const User = mongoose.model('User', userSchema);
export default User;