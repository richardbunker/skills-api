var express = require("express");
const { abort, getCredentials } = require("../lib/http");
const { validateCredentials, createAuthToken } = require("../lib/auth");
var router = express.Router();

// Authenticate the credentials and issue a JWT
router.post("/login", async function (req, res) {
  // Extract credentials from request body
  const [username, password] = getCredentials(req.body);

  // Verify request has credentials
  if (!username || !password) {
    return abort(400, res, "Request body incomplete - email and password needed");
  }

  // Validate credentials
  const match = await validateCredentials(username, password);
  if (!match) {
    return abort(401, res, "Incorrect credentials.");
  }

  // Return fresh JWT
  res.status(200).json({ ...createAuthToken() });
});

module.exports = router;
