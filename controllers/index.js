const router = require('express').Router();

const apiRoutes = require('./api');
const profileRoutes = require('./profileapi');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profileapi', profileRoutes)

module.exports = router;
