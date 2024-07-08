const { setAsync, getAsync, keysAsync } = require("../redis");

const createUser = async (req, res) => {
  const { id, name, email, password } = req.body;

  if (!id || !name || !email || !password) {
    return res
      .status(400)
      .json({ error: "ID, name, email and password are required" });
  }

  const user = { id, name, email, password };

  try {
    await setAsync(id, JSON.stringify(user));
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const userString = await getAsync(id);
    if (!userString) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = JSON.parse(userString);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const keys = await keysAsync("*");
    const users = await Promise.all(
      keys.map(async (key) => {
        const user = await getAsync(key);
        return JSON.parse(user);
      })
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!id || (!name && !email && !password)) {
    return res
      .status(400)
      .json({ error: "At least one of name, email or password is required" });
  }

  try {
    const userString = await getAsync(id);
    if (!userString) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = JSON.parse(userString);
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await setAsync(id, JSON.stringify(user));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const existingUser = await getAsync(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await delAsync(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser };
