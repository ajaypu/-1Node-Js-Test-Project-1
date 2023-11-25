const express = require("express");
const reviewController = require("../controller/review");
const router = express.Router();
const path = require("path");

// router.post("/", reviewController.addReview);
router.post("/", async (req, res, next) => {
  await reviewController.addReview(req, res, next);
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

router.get("/", reviewController.getAllReview);

exports.router = router;
