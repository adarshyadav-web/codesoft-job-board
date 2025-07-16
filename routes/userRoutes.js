const express = require("express");
const userAuth = require("../middelwares/authMiddelwares");
const { getUserController, updateUserController } = require("../controllers/userController");

const router = express.Router();

// get user data
router.post('/getUser', userAuth, getUserController);

// update user controller import
router.put("/update-user", userAuth, updateUserController);

module.exports = router;