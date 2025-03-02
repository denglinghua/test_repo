import response from "../../common/response.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!verify(username, password)) {
    return response.error(res, 1, 'Invalid username or password.');
  }

  const token = createToken(username);
  return response.ok(res, 'Login successful', {username : username, token: token });
}

function verify(username, password) {
  return username !== 'error';
}

function createToken(username) {
  const token = jwt.sign(
    {
      username: username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return token;
}

export default {
  login,
};
