const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// All Admin Routes should only be accessble to logged in Admins!

router.get('/users/:role', async function (req, res, next) {
  let role = req.params.role;
  if (!req.session.user || !req.session.isAdmin) {
    res.redirect('/');
  } else {
    let users = await userController.getUsers(role);
    // console.log(users)

    res.render('users', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.isAdmin, users: users });
  }
});

router.get('/delete/:userId', async function (req, res, next) {
  let userId = req.params.userId;

  await userController.deleteUserById(userId);

  res.redirect('/');
});

router.post("/toggleuser", async function (req, res, next) {
  
  let userId = req.body.UserId;
  let isEnabled = false;
  if (req.body.CBE) {
    isEnabled = true
  }
  
  let isAdmin = false;
  if (req.body.CBA) {
    isAdmin = true
  }
  await userController.setUserIsEnabled(userId, isEnabled)
  // if userids match session do not work
  if ((req.session.user.userId != userId) && req.session.isAdmin) {
    await userController.setUserIsAdmin(userId, isAdmin)
  }

  res.redirect('/a/users/user')
});

module.exports = router;
