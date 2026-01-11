const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Extract token from "Bearer <token>" format
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    // 403 Forbidden is standard for invalid/expired tokens
    res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
