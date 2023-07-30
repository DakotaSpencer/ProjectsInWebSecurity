const express = require('express');
const { getQuestions } = require('../controllers/gameController');
const router = express.Router();

router.get('/play', async function(req, res, next) {
  let index=0;
  // TODO: Implement Game
  let questions = await getQuestions()
  
  res.render('play', {user: req.session.user, questionArray: questions, index: index});
});

module.exports = router;