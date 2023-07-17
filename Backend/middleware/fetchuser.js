var jwt = require("jsonwebtoken");
const JWT_SECRET = "milaisagoodgi$rl";

const fetchuser = (req, res, next) => {
  // get the user from jwt token and add id to requestobj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.send(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
