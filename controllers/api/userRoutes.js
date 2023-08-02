const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    const validPassword = await userData.checkPw(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.userCity = userData.location;

      res.json({ user: userData, message: 'You are now logged in!' });
    });


  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      user_name: req.body.user_name,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      location: req.body.location,
      title: req.body.title,
      img: req.body.picture,
      company: req.body.company,
      experience: req.body.experience,
      education: req.body.education,
      skills: req.body.skills,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      req.session.userCity = dbUserData.location;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
