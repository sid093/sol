var express = require('express')
var router = express.Router()

module.exports = exports = function(auth, redis) {
  // Lookup Application in Redis
  router.get('/:id', (req, res) => {
    redis.getAppHost(req.params.id)
      .then(host => res.send(host))
      .catch(err => res.send(err));
  });

  // Create or Update Application in Redis
  router.post('/', auth.protect('basic'), (req, res) => {
    redis.setAppHost(req.body.app, req.body.host)
      .then(host => res.send(host))
      .catch(err => res.send(err));
  });

  return router;
}
