const model = require("../model/review");
const Review = model.Review;

exports.addReview = (req, res) => {
  const doc = {
    cName: req.body.companyName,
    rate: req.body.rate,
    pros: req.body.pros,
    cons: req.body.cons,
  };
  const review = new Review(doc);
  review
    .save()
    .then((doc) => {
      console.log(doc);
      // res.status(201).json(req.body);
    })
    .catch((err) => console.log(err));
};

const companyReviews = (reviews) => {
  let rating = 0;
  let str = ``;
  let count = reviews.length;

  for (let i = 0; i < reviews.length; i++) {
    rating += Number(reviews[i].rate);
  }

  if (reviews.length > 0) {
    str += `<h2>Company Reviews: ${reviews[0].cName}</h2>
            <li>Company Rating: ${rating / count} </li>`;
  }
  reviews.forEach((review) => {
    str += `
          <div>
            <ul>
              
              <li>Pros: ${review.pros}</li>
              <li>Cons: ${review.cons}</li>
              <hr>
            </ul>
          </div>`;
  });
  return str;
};

exports.getAllReview = async (req, res) => {
  const getAllReview = await Review.find({
    cName: req.query.searchCompanyName,
  });
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nodejs Test Project</title>
      <link rel="shortcut icon" href="#" />
      <link rel="stylesheet" type="text/css" href="./style.css" />
    </head>
  
    <body>
      <div class="container">
        <form method="POST" class="review-form" action="/addReview">
          <div class="form1">
            <div class="review">
              <label for="companyName" class="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                placeholder="company name"
                class="text"
                name="companyName"
              />
            </div>
            <div class="review">
              <label for="pros">Pros:</label>
              <textarea id="pros" class="text" name="pros"> </textarea>
            </div>
            <div class="review">
              <label for="cons">Cons:</label>
              <textarea id="cons" class="text" name="cons"> </textarea>
            </div>
            <h3>Ratings:</h3>
            <div class="rate">
              <input type="radio" id="star5" name="rate" value="5" />
              <label for="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label for="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label for="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label for="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label for="star1" title="text">1 star</label>
            </div>
            <br />
            <br />
            <br />
            <div>
              <input type="submit" value="Submit" id="button" />
            </div>
          </div>
        </form>
      </div>
      <br />
      <br />
      <div class="container-1">
        <form action="/getAllReview" method="GET" class="company-review">
          <div class="searchCompany" id="searchCompany">
            <div>
              <input
                type="text"
                placeholder="Search Company Name"
                name="searchCompanyName"
                id="scn"
              />
              <input type="submit" value="Submit" id="green" />
            </div>
            ${companyReviews(getAllReview)}
          </div>
        </form>
      </div>
    </body>
  </html>`);
};

/**
 * <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nodejs Test Project</title>
    <link rel="shortcut icon" href="#" />
    <link rel="stylesheet" type="text/css" href="./style.css" />
  </head>

  <body>
    <div class="container">
      <form method="POST" class="review-form" action="/addReview">
        <div class="form1">
          <div class="review">
            <label for="companyName" class="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              placeholder="company name"
              class="text"
              name="companyName"
            />
          </div>
          <div class="review">
            <label for="pros">Pros:</label>
            <textarea id="pros" class="text" name="pros"> </textarea>
          </div>
          <div class="review">
            <label for="cons">Cons:</label>
            <textarea id="cons" class="text" name="cons"> </textarea>
          </div>
          <h3>Ratings:</h3>
          <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
          </div>
          <br />
          <br />
          <br />
          <div>
            <input type="submit" value="Submit" id="button" />
          </div>
        </div>
      </form>
    </div>
    <br />
    <br />
    <div class="container-1">
      <form action="/getAllReview" method="GET" class="company-review">
        <div class="searchCompany" id="searchCompany">
          <div>
            <input
              type="text"
              placeholder="Search Company Name"
              name="searchCompanyName"
              id="scn"
            />
            <input type="submit" value="Submit" id="green" />
          </div>
          <h2>Company Reviews:</h2>
          <div>
            <ul>
              <li>pros</li>
              <li>cons</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </body>
</html>

 */
