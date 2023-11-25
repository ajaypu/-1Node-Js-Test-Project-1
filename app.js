const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const reviewRouter = require("./routes/review");

// Use body-parser middleware to parse form data
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB Connection
main().catch((err) => console.log(err));

//username=ajayworld
//password=XxmMpKfZGdYTIrwI (admin)

//db username=ajayworld
//db password=AAyJqjYwHszHXsUv
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ratingDB");
  // "mongodb+srv://ajayworld:XxmMpKfZGdYTIrwI@companyrating1.ijuxpo4.mongodb.net/ratingDatabase"

  console.log("Database Connected Sucessfully");
}

app.use("/addReview", reviewRouter.router);

// app.use("/getAllReview", reviewRouter.router);
app.use("/getAllReview", reviewRouter.router);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(3000, () => {
  console.log("Server started");
});
