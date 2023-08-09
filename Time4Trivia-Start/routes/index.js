const express = require('express');
const { getLeaderboard, addQuestion } = require('../controllers/gameController');
const {getUnapprovedQuestions, approveQuestion} = require('../controllers/questionController');
const router = express.Router();

router.get('/', function(req, res, next) {
  // console.log(req.session.user);
  // console.log("/ cookies", req.cookies);
  res.render('index', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.isAdmin });
});

router.get('/leaderboard', async function(req, res, next) {
  let leaderboard = (await getLeaderboard(10))[0]
  // console.log(JSON.stringify(leaderboard))
  res.render('leaderboard', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.isAdmin, leaders: leaderboard });
});

router.get('/submit', function(req, res, next){
  if(req.session.user){
    res.render('submit', {title: 'Add a Question - Time 4 Trivia', user: req.session.user, isAdmin: req.session.isAdmin})
  }else {
    res.redirect("/")
  }
})

router.post('/submit', async function(req, res, next){
  let question = req.body.question;
  let correctAnswer = req.body.correct_answer;
  let ia1 = req.body.incorrect_one;
  let ia2 = req.body.incorrect_two;
  let ia3 = req.body.incorrect_three;
  await addQuestion(question, correctAnswer, ia1, ia2, ia3)
  res.redirect('/')
})

router.get('/pending', async function(req, res, next){
  if(req.session.isAdmin){
    let pendingQuestions = await getUnapprovedQuestions();
    console.log(JSON.stringify(pendingQuestions))
    res.render('pendingQuestions', {title: 'Pending Questions - Time 4 Trivia', user: req.session.user, isAdmin: req.session.isAdmin, pendingQuestions})
  }else{
    res.redirect('/')
  }

})

router.post('/pending', async function(req, res){
  let questionID = req.body.QuestionId;
  let questionApprove = req.body.approveQuestion;
  console.log(req.body)
  console.log(typeof(questionApprove))
  if(questionApprove){
    await approveQuestion(questionID, 1);
    res.redirect('/pending')
  }else{
    console.log("Unable to approve question. One or more paramaters may be missing.")
  }
})

module.exports = router;