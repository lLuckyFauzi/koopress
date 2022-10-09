const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const userMiddleware = require("../middleware/middleware");

router.get("/message", userController.getMessage);
router.get("/getAllUser", userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/userDetail",
  userMiddleware.middleware,
  userController.userDetail
);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
