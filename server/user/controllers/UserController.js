import response from "../../common/response.js";
import jwt from "jsonwebtoken";
import env from "../../env.js";

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
  // 'error' used for testing login failure
  return username !== 'error';
}

function createToken(username) {
  const token = jwt.sign(
    {
      username: username
    },
    env.JWTSecret(),
    {
      expiresIn: "2h",
    }
  );

  return token;
}

export default {
  login,
};
