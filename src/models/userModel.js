const pool = require("../config/db");

const createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };

// Accept limit and offset
const getAllUsers = async (limit = 10, offset = 0) => {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return result.rows;
};

const updateUser = async (id, name, email) => {
  // The query updates name/email only if provided
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
    [name, email, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};
