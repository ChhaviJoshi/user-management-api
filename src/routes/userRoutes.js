const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware"); // Import the Guard

router.get("/", verifyToken, userController.getUsers);

router.put("/:id", verifyToken, userController.updateUser);

router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
