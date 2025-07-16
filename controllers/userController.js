const userModels = require("../models/userModels");

const updateUserController = async (req, res, next) => {
    const { name, lastName, email, location } = req.body;
    if (!name || !lastName || !email || !location) {
        next(new Error('All fields are required'));
    }
    const user = await userModels.findOne({ _id: req.user._id });
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token: token
    });
}

// get user data
const getUserController = async (req, res, next) => {
    try {
        const user = await userModels.findById(req.user._id);
        user.password = undefined; // remove password from user data
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            });
        } else {
            res.status(200).send({
                success: true,
                message: "User data fetched successfully",
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
            error: error.message
        })
    }
};

module.exports = { updateUserController, getUserController }

