const Session = require("../models/Session.model");

module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.headers.authorization || req.headers.authorization === "null") {
    return res.status(403).json({ errorMessage: "You are not logged in" });
  }

  Session.findById(req.headers.authorization)
    .then((session) => {
      if (!session) {
        return res
          .status(403)
          .json({ errorMessage: "Your session is invalid" });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({ errorMessage: err.message });
    });
};