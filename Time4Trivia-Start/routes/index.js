const express = require('express');
const { getLeaderboard } = require('../controllers/gameController');
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
  let question={
    query: req.body.question,
    answers:[
      {answer1: req.body.answers[0]},
      {answer2: req.body.answers[1]},
      {answer3: req.body.answers[2]},
      {answer4: req.body.answers[3]},
    ]
  }
})

module.exports = router;