var parseCookies = function(req, res, next) {
  if (req.get('Cookie') === undefined) {
    req.cookie = {};
    next();
  } else {
    var cookieString = req.get('Cookie');
    var cookiePairs = cookieString.split(';');
    var cookieObject = cookiePairs.reduce(function(memo, item) {
      var tuple = item.trim().split('=');
      memo[tuple[0]] = tuple[1];
      return memo;
    }, {});
    req.cookie = cookieObject;
    next();
  }
};
   
module.exports = parseCookies;                