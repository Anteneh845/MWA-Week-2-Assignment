const express = require("express");
const router = express.Router();
const {authenticateUser, getUser,createUser} = require("../controllers/user.controller")
const {registerUserValidator,authenticateUserValidator} = require("../validators/user.validator");
const {authenticate} = require("../middlewares/auth.middleware")

router.post("/users", registerUserValidator, createUser);

router.post("/auth", authenticateUserValidator, authenticateUser)
router.get("/users/me", authenticate, getUser)

module.exports = router;