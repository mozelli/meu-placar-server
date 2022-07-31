const jwt = require("jsonwebtoken");

function generateJWT(id) {
  const token = jwt.sign({ id }, process.env.TOKEN_HASH, {
    expiresIn: 86400,
  });
  return token;
}

module.exports = { generateJWT };
