var db = require('../db');
var util = require('../lib/utility');
var user = require('./user');
// Write you session database model methods here

module.exports = {
  createSession: function (username) {
    var queryString = 'insert into sessions (session_key, username_id) values (?, ?)';
    var sessionKey = util.hashing(Math.floor(Math.random() * Math.pow(10, 16)).toString());
    return user.getUserId(username)
    .then (function(results) {
      console.log(results[0][0], '---------------------------------------------haha');
      return db.queryAsync(queryString, [sessionKey, results[0][0].id]);
    });
  }
};
