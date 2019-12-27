const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/u/:userId', (req, res) => {
  res.sendFile(process.cwd() + '/views/list.html');
});

router.get('/ex/:exId', (req, res) => {
  res.sendFile(process.cwd() + '/views/detail.html');
});

module.exports = router;
