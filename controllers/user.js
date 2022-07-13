const UserModel = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await UserModel.find({}, "-password");
    res.send({
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    let user = await UserModel.findOne({ username }, "-password");
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    //TODO: Requiere validation
    let { username, name, lastName, email, password, role } = req.body;
    let newUser = await UserModel.create({
      username,
      name,
      email,
      lastName,
      password,
      role,
    });
    newUser.password = null;
    res.send({ newUser });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // TODO: Requiere validation
    // What user?
    let usernameToUpdate = req.params.username;
    // New data
    let { username, name, lastName, role } = req.body; // TODO: Omit email and password, we need create a recovery strategic
    let user = await UserModel.findOne({ username: usernameToUpdate });

    if (!user)
      return res.status(400).send({
        message: "User to update not found",
      });

    user.username = username;
    user.name = name;
    user.lastName = lastName;
    user.role = role;

    let updatedUser = await user.save();

    if (user == updatedUser) {
      return res.send({
        message: "User is updated",
        user: { username, name, lastName, email: user.email, role: user.role },
      });
    }
    res.send({
      message: "cannot update the user",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    let { deletedCount } = await UserModel.deleteOne({ username });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the user, maybe is delete before",
    });
  } catch (err) {
    next(err);
  }
};