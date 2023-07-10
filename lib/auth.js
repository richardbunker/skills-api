const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createPasswordHash(plainTextPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);
  return hash;
}

async function validateCredentials(username, plainTextPassword) {
  const userMatch = username === process.env.DEMO_USERNAME;
  const passMatch = bcrypt.compare(plainTextPassword, process.env.DEMO_PASSWORD);
  return userMatch && passMatch;
}

/**
 * Create and returns a fresh JWT
 * @returns JWT Object
 */
function createAuthToken() {
  const expires_in = 60 * 60 * 2; // 2 hour JWT lifespan
  const exp = Math.floor(Date.now() / 1000) + expires_in;
  const token = jwt.sign({ exp }, process.env.JWT_SECRET);
  return {
    token,
    token_type: "Bearer",
    expires_in,
  };
}

module.exports = { createPasswordHash, validateCredentials, createAuthToken };
