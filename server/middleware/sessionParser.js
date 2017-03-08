var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
  var cookies = req.cookie;
  console.log('executed session parser!!!!!!!!!!!!!!!', cookies);
  //check if (cookie is not empty || session and username cookie exists)
  if (cookies.session === undefined) {
    req.session = null;
    // next();
  } else {
    Sessions.getSessionKey(cookies.username)
    .then( function(results) {
      console.log(results[0], 'this is the result of sessionkey in session parser');
      if (results.length > 0 && results[0].session_key === cookies.session) {
        console.log('------------------------------in createaSess : cookies.sessionKey = ', cookies.session);
        req.session = {username: cookies.username};
        // next();
      } else {
        Sessions.deleteSession(cookies.session);
        //res.clearCookie('session', 'username');
        req.session = null;
        console.log('clearing cookies');
      }
    });
  }
  next();
};

module.exports = createSession;
