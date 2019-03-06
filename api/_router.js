var express = require('express')
var router = express.Router()

module.exports = exports = function(auth, redis) {
  // Lookup Application in Redis
  router.get('/:id', (req, res) => {
    redis.getAppHost(req.params.id)
      .then(host => res.json({
        app: req.params.id,
        hosts: host
      }))
      .catch(err => res.json({err:err}));
  });

  // Create or Update Application in Redis
  router.post('/', auth.protect('basic'), (req, res) => {
    redis.setAppHost(req.body.app, req.body.host)
      .then(reply => res.json({msg:reply}))
      .catch(err => res.json({err:err}));
  });

  return router;
}
