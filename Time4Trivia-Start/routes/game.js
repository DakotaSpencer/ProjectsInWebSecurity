const express = require('express');
const gameController = require('../controllers/gameController');
const userController = require('../controllers/userController');
const router = express.Router();
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

router.get('/play', async function(req, res, next) {
  if(req.session.user){
    let questions = await gameController.getQuestions(10)

    console.log(questions)
    res.render('play', {user: req.session.user, questionArray: questions});
  }
  else{
    res.render('index')
  }
  
});

router.post('/play', async function(req, res, next){
  if(req.session.user){
    let user = req.session.user;
    let id = JSON.stringify(user.userId);
    let score = req.body.score;
    let result = await userController.updateUserLeaderboard(id, score);
    console.log(result);
    res.redirect('/leaderboard')
    return result;
  }else{
    return "Error, unable to complete action. Are you logged in?"
  }
})

module.exports = router;