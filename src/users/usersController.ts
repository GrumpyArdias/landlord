import userService from "./userService";

const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.json(user);
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  res.json(user);
};
