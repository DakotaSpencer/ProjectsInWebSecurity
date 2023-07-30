const express = require('express');
const { getQuestions } = require('../controllers/gameController');
const router = express.Router();

router.get('/play', async function(req, res, next) {
  // TODO: Implement Game
  let questions = await getQuestions(10)

  console.log(questions)
  res.render('play', {user: req.session.user, questionArray: questions});
});

module.exports = router;