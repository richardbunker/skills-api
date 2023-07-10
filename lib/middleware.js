const jwt = require("jsonwebtoken");
const { abort } = require("./http");

/**
 * Middleware to validate JWT
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function ensureJwtTokenIsValid(req, res, next) {
  if (!("authorization" in req.headers) || !req.headers.authorization.match(/^Bearer /)) {
    abort(401, res, "Authorization header ('Bearer token') not found");
    return;
  }
  const token = req.headers.authorization.replace(/^Bearer /, "");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      abort(401, res, "Token expired");
    } else {
      abort(401, res, "Token invalid.");
    }
    return;
  }

  next();
}

/**
 * A middleware function to ensure no query parameters in request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns 400 error if query params are present
 */
function ensureNoQueryParams(req, res, next) {
  const params = Object.keys(req.query);
  if (params.length > 0) {
    return abort(
      400,
      res,
      `Invalid query parameters: ${params.join(", ")}. Query parameters are not permitted.`
    );
  }
  next();
}

module.exports = { ensureJwtTokenIsValid, ensureNoQueryParams };
