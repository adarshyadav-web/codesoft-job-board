const userModels = require("../models/userModels");

const registerController = async (req, res, next) => {
    try {
        const { name, email, password, lastName } = req.body;

        // Check if request body is empty
        if (!name && !email && !password) {
            next(new Error("Request body is empty"));
        }

        // Validate input
        if (!name || !email || !password) {
            next(new Error("Please provide all required fields: name, email, and password"));
        }
        // Check if user already exists (this is a placeholder, replace with actual DB check)
        const existingUser = await userModels.findOne({ email }) // Replace with actual user lookup logic

        if (existingUser) {
            next(new Error("User already exists with this email"));

        }

        // Create new user (this is a placeholder, replace with actual DB save logic)

        const newUser = new userModels({ name, email, password, lastName }); // Replace with actual user creation logic
        await newUser.save();// Save the new user to the database

        // token generation
        const token = newUser.createJWT(); // Assuming createJWT is a method on the user model
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            data: newUser,
            token: token // Include the generated token in the response
        });

    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    // Check if request body is empty
    if (!email || !password) {
        return next(new Error("Please provide email and password"));
    }
    // find user by email
    const user = await userModels.findOne({ email }).select("+password"); // Use select("+password") to include the password field in the query result
    if (!user) {
        return next(new Error("Invalid Username or Password"));
    }
    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new Error("Invalid Username or Password"));
    }
    user.password = undefined; // Remove password from the user object before sending it in the response
    // token generation
    const token = user.createJWT(); // Assuming createJWT is a method on the user model
    res.status(200).send({
        success: true,
        message: "User logged in successfully",
        data: user,
        token: token // Include the generated token in the response
    });

}

// Export the controllers
module.exports = { registerController, loginController };