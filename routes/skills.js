const express = require("express");
const fs = require("fs");
const { ensureJwtTokenIsValid, ensureNoQueryParams } = require("../lib/middleware");
const { abort } = require("../lib/http");
const router = express.Router();

/**
 * GET /skills/
 * Returns a list of skills from the db.
 */
router.get("/", ensureJwtTokenIsValid, ensureNoQueryParams, function (req, res) {
  fs.readFile("db/skills.json", "utf-8", (err, data) => {
    if (err) {
      return abort(500, res, "Sorry! Looks like we have a database error.");
    }
    res.status(200).json(JSON.parse(data));
  });
});

module.exports = router;
