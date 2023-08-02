const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    //set a varaible to the location of the logged in user
    const localUser = req.session.userCity;
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      where: {
        location: localUser
      }
    })
    const usersList = users.map((user) => user.get({ plain: true }));
    console.log(users);
    if (usersList.length) {
      //render the hp.handlebars template with the user data
      res.render('hp', {
        users: usersList,
        logged_in: req.session.logged_in
      })
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;