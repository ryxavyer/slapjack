const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
