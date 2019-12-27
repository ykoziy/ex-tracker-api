const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/u/:userId', (req, res) => {
  res.sendFile(process.cwd() + '/views/list.html');
});


module.exports = router;
