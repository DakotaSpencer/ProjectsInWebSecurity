const express = require('express');
const { getLeaderboard, addQuestion } = require('../controllers/gameController');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.user);
  console.log("/ cookies", req.cookies);
  res.render('index', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin });
});

router.get('/leaderboard', async function(req, res, next) {
  // TODO: Get actual leader data from the MONGO database!
  let leaderboard = await getLeaderboard(10)
  console.log(JSON.stringify(leaderboard[0]))
  res.render('leaderboard', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin, leaders: leaderboard[0] });
});

router.get('/submit', function(req, res, next){
  res.render('submit', {title: 'Add a Question - Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin})
})

router.post('/submit', async function(req, res, next){
  let question = req.body.question;
  let correctAnswer = req.body.correct_answer;
  let ia1 = req.body.incorrect_one;
  let ia2 = req.body.incorrect_two;
  let ia3 = req.body.incorrect_three;
  let quesResult = await addQuestion(question, correctAnswer, ia1, ia2, ia3)
  console.log(quesResult);
  res.redirect('/')
})

module.exports = router;