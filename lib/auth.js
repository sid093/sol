const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const BasicStrategyWrapper = new BasicStrategy(
  function(username, password, done) {
    if(username === process.env.APP_USER && password === process.env.APP_PASSWORD) {
      return done(null, true);
    } else {
      return done(null, false, { message: 'Not Authenticated.'});
    }
  }
);

module.exports = exports = {
  init: _ => {
    passport.use(BasicStrategyWrapper);
    return passport.initialize();
  },
  protect: strategy => passport.authenticate(strategy, { session: false })
};
