const auth = (req, res, next) => {
  if (req.headers.authorization != null) {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const [user, pass] = Buffer.from(base64Credentials, "base64")
      .toString()
      .split(":");
    if (user == process.env.user && pass == process.env.pass) next();
    else {
      res.status(401).send({ success: false, message: "Autherization failed" });
    }
  } else {
    res.status(401).send({ success: false, message: "Autherization failed" });
  }
};

module.exports = { auth };
