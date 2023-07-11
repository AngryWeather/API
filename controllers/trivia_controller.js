const pool = require("../connection");

const getCategories = async (req, res) => {
  const response = await fetch("https://opentdb.com/api_category.php");
  const json = await response.json();
  res.status(200).json(json);
};

const isNumOfQuestionsValid = (numOfQuestions) => {
  return numOfQuestions > 0 && numOfQuestions < 51;
};

const postTriviaData = (req, res, next) => {
  const { numOfQuestions } = req.body;

  if (!isNumOfQuestionsValid(numOfQuestions)) {
    res.status(400).json({
      error: "Number of questions must be between 1 and 50 (both inclusive)",
    });
  }

  next();
};

const setScore = async (req, res) => {
  const currentScore = await pool.query(
    "SELECT score FROM users WHERE username = $1",
    [req.body.username]
  );

  const { score } = req.body;

  if (currentScore.rows[0].score === null || score > currentScore) {
    await pool.query("UPDATE users SET score = $1 WHERE username = $2", [
      score,
      req.body.username,
    ]);
  }

  res.status(200).json();
};

const generateURL = async (req) => {
  let url = `https://opentdb.com/api.php?amount=${req.body.numOfQuestions}`;

  if (req.body.category !== undefined) {
    const response = await fetch("https://opentdb.com/api_category.php");
    const categories = await response.json();
    const id = categories.trivia_categories.find(
      (n) => n.name === req.body.category
    ).id;
    url += `&category=${id}`;
  }
  if (req.body.type !== undefined) {
    url += `&type=${req.body.type}`;
  }
  if (req.body.difficulty !== undefined) {
    url += `&difficulty=${req.body.difficulty}`;
  }

  return url;
};

const generateForm = async (req, res) => {
  const url = await generateURL(req);
  const response = await fetch(url);
  const trivia = await response.json();

  res.status(200).json(trivia);
};

module.exports = {
  getCategories,
  postTriviaData,
  generateForm,
  setScore,
};
