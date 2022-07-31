const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).json({ message: "No token provided." });

  const authenticationParts = authHeader.split(" ");

  if (!authenticationParts.length === 2)
    return response.status(401).json({ message: "Token error." });

  const [scheme, token] = authenticationParts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ message: "Invalid token format." });

  jwt.verify(token, process.env.TOKEN_HASH, (error, decoded) => {
    if (error)
      return response
        .status(401)
        .json({ message: "Invalid or expired token." });

    request.userId = decoded.id;
    return next();
  });
};
