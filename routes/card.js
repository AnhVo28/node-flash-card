var express = require("express");
const routes = express.Router();
const { data } = require("../data/flashCard.json");
const { cards } = data;

// Random question according to card length
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// when entering to "/cards", it will randomly choose one of those questions
routes.get("/", (req, res) => {
  const numberOfCard = cards.length;
  const randomNumber = getRandomInt(numberOfCard);
  res.redirect(`/cards/${randomNumber}`);
});

routes.get("/:id", (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  var name = req.cookies.username;
  console.log("name: ", name);

  // if there is no query, it will redirect to default question page
  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const cardData = { text, id, name, side };

  // Manipulate the a link in template
  if (side === "question") {
    cardData.hint = hint;
    cardData.sideToShow = "answer";
    cardData.sideToDisplay = "Answer";
  } else if (side === "answer") {
    cardData.sideToShow = "question";
    cardData.sideToDisplay = "Question";
  }

  res.render("card", cardData);
});

module.exports = routes;
