const router = require('express').Router();
const path = require('path');
const apiRoutes = require('../routes/api');

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;
