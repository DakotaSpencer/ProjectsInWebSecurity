const express = require('express');
const { getLeaderboard, addQuestion } = require('../controllers/gameController');
const {getUnapprovedQuestions} = require('../controllers/questionController');
const router = express.Router();

router.get('/', function(req, res, next) {
  // console.log(req.session.user);
  // console.log("/ cookies", req.cookies);
  res.render('index', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin });
});

router.get('/leaderboard', async function(req, res, next) {
  let leaderboard = (await getLeaderboard(10))[0]
  // console.log(JSON.stringify(leaderboard))
  res.render('leaderboard', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin, leaders: leaderboard });
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
  // console.log(quesResult);
  res.redirect('/')
})

router.get('/pending', async function(req, res, next){
  let pendingQuestions = await getUnapprovedQuestions();
  console.log(JSON.stringify(pendingQuestions))
  res.render('pendingQuestions', {pendingQuestions})
})

router.post('/pending', async function(req, res){
  let questionID = req.body.QuestionId;
  let questionApprove = req.body.approveQuestion;
  console.log(req.body)
  console.log(typeof(questionApprove))
})

module.exports = router;