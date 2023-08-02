const { User } = require('../../models');

const router = require('express').Router();

// Controller route for the profile page
router.get('/profile/:userId', async (req, res) => {
  try {
    // Use findByPk to find the user by their primary key (id)
    const user = await User.findByPk(req.params.userId, {
      include: [{ all: true }],
      attributes: { exclude: ['password'] }
    })
    if (user) {
      const userData = user.get({ plain: true })

      // Render the profile.handlebars template with the user data
      res.render('profile', {
        userData,
        logged_in: req.session.logged_in
      })
    } else {
      res.status(404).end();
    }
  } catch (err) {
    // Handle any errors that occurred during the query or rendering
    console.error('Error fetching user data:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// http://localhost:3001/profileapi/profiles/profile/1