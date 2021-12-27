const auth = (req, res, next) => {
  console.log("User Authenticated");
  console.log("=========");
  if (req.headers.authorization != null) {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const [user, pass] = Buffer.from(base64Credentials, "base64")
      .toString()
      .split(":");
    if (user == process.env.user && pass == process.env.pass) next();
    else {
      res.status(401).send("Autherization failed");
    }
    console.log(user, pass);
  } else {
    res.status(401).send("Autherization failed");
  }
};

module.exports = { auth };
