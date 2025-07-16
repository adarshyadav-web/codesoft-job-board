const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: true // Exclude password from query results by default

    },
    location: {
        type: String,
    },

},
    { timestamps: true } // Automatically manage createdAt and updatedAt fields 

);
// Hash password before saving to the database
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return; // Only hash the password if it has been modified or is new
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
};

// This method will be used to compare the password entered by the user during login with the hashed password stored in the database
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}

module.exports = mongoose.model('User', userSchema);