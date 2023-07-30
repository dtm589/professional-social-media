const { User } = require('../../models');

const router = require('express').Router();

// Controller route for the profile page
router.get('/profile/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
  
    try {
      // Use findByPk to find the user by their primary key (id)
      const user = await User.findByPk(userId);
  
      if (!user) {
        // Handle case when the user is not found
        res.status(404).send('User not found');
        return;
      }
  
      // Render the profile.handlebars template with the user data
      res.render('profile', { User });
    } catch (err) {
      // Handle any errors that occurred during the query or rendering
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router;