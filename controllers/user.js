const db = require("../helper/relation");
const { User } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRound = 8;

module.exports = {
  getMessage: (req, res) => {
    res.status(200).json({ message: "Happy Coding :)" });
    res.end();
  },
  register: async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const hashPassword = await bcrypt.hash(password, saltRound);
    try {
      const user = await User.findOne({
        where: { email: email },
      });
      if (user) {
        res.status(422).json({
          message: "Email already in use",
        });
      } else {
        const data = await User.create({
          username: req.body.username,
          email: email,
          password: hashPassword,
        });
        res.status(201).json({
          message: "Register Success",
          data: data,
        });
      }
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const data = await User.findOne({
        where: { email: email },
      });
      if (!data) {
        req.status(404).json({
          message: "User not found!",
        });
      }

      const passwordValidate = await bcrypt.compare(password, data.password);
      if (!passwordValidate) {
        res.status(422).json({
          message: "Wrong password!",
        });
      }

      const payload = {
        ID: data.dataValues.id,
        username: data.username,
      };
      const token = jwt.sign(payload, "TOKEN");
      res.status(201).json({
        username: data.username,
        token: token,
      });
    } catch (error) {
      res.status(422).json({
        message: error.message,
      });
    }
  },
  userDetail: async (req, res) => {
    try {
      const data = await User.findOne({
        where: { ID: req.payload.ID },
      });
      if (!data) {
        res.status(404).json({
          message: "Not Found",
        });
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(422).json({
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, saltRound);
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        const data = await User.update(
          {
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
          },
          { where: { id: req.params.id } }
        );
        res.status(201).json({ message: "User updated" });
      }
    } catch (error) {
      res.status(422).json({
        message: error.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await User.findAll({});
      if (data.length === 0) {
        res.status(404).json({
          message: "Empty",
        });
      }
      res.status(201).json({
        data: data,
      });
    } catch (error) {
      res.status(422).json({
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const data = await User.destroy({ where: { id: req.params.id } });
      res.status(201).json({
        message: "User deleted",
      });
    } catch (error) {
      res.status(422).json({
        message: error.message,
      });
    }
  },
};
