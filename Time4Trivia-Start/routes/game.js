const express = require('express');
const { getQuestions } = require('../controllers/gameController');
const router = express.Router();

router.get('/play', async function(req, res, next) {
  // TODO: Implement Game
  let questions = await getQuestions()
  
  res.render('play', {user: req.session.user, questions});
});

module.exports = router;