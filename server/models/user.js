var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {

  createUser: function (username, password) {
    var hash = utils.hashing(password);
    var queryObject = {username: username, password: hash};
    var queryString = 'INSERT INTO users SET ?';
    return db.queryAsync(queryString, queryObject);
  },

  isUserInDatabase: function (username) {
    var queryString = 'select * from users where username = ?';
    var queryParams = [username];
    return db.queryAsync(queryString, queryParams);
  },

  canlogin: function (username, password) {
    var hash = utils.hashing(password);
    var queryString = 'SELECT * FROM users WHERE username = ? and password = ?';
    var queryParams = [username, hash];
    return db.queryAsync(queryString, queryParams);
  }

  
  
};
