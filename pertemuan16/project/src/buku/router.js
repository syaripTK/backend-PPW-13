const express = require("express");
const {
  getBooks,
  searchBook,
  createBook,
  burnBook,
  manipulateBook,
  searchBookByPrice,
} = require("./controller.js");
const { checkId, bodyValidate } = require("./middleware.js");

const router = express.Router();

router.get("/", getBooks);
router.get("/search/:id", checkId, searchBook);
router.post("/add", bodyValidate, createBook);
router.patch("/edit/:id", checkId, bodyValidate, manipulateBook);
router.delete("/drop/:id", checkId, burnBook);
router.get("/price", searchBookByPrice);

module.exports = router;
