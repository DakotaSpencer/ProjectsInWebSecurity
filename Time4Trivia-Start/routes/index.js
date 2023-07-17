const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.user);
  console.log("/ cookies", req.cookies);
  res.render('index', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin });
});

router.get('/leaderboard', function(req, res, next) {
  // TODO: Get actual leader data from the MONGO database!
  let leaders = [
    {
      name: 'Sue', score: 100
    },
    {
      name: 'Don', score: 99
    },
    {
      name: 'Ralph', score: 3
    }
  ];

  res.render('leaderboard', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin, leaders: leaders });
});

router.get('/score', function(req, res, next){
  let finalScore=[{
    name: "User", score: 1234
  }];

  res.render('score', {title: 'Time 4 Trivia', score: finalScore});
})

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