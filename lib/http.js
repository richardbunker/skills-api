/**
 * Handle and respond to various HTTP errors.
 * @param {int} statusCode
 * @param {object} res
 * @param {string} errorMessage
 */
function abort(statusCode, res, errorMessage = "Oops! There was an error") {
  res.status(statusCode).json({
    error: true,
    message: errorMessage,
  });
}

/**
 * Destructure the request body and return username and password tuple.
 * @param {object} param0
 * @returns Array
 */
function getCredentials({ username, password }) {
  return [username, password];
}

module.exports = { abort, getCredentials };
