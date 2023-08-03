const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const usersData = await User.findAll({
      attributes: { exclude: ['password'] },
      where: {
        location: req.session.location, // Assuming the user's location is stored in req.session.location
      },
      limit: 8, // Limiting the results to 8 users
      order: [['user_name', 'ASC']], // Ascending order based on the user_name
    });

    const users = usersData.map((user) => user.get({ plain: true }));

    res.render('hp', {
      users,
      logged_in: req.session.logged_in,
    });
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