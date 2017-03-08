var db = require('../db');
var util = require('../lib/utility');
var user = require('./user');
// Write you session database model methods here

module.exports = {
  makeNewSession: function (username) {
    var queryString = 'insert into sessions (session_key, username_id) values (?, ?)';
    var sessionKey = util.hashing(Math.floor(Math.random() * Math.pow(10, 16)).toString());
    return user.getUserId(username)
    .then (function(results) {
      return db.queryAsync(queryString, [sessionKey, results[0][0].id]);
    });
  },

  getSessionKey: function(username) {
    var queryString = 'select * from sessions where sessions.username_id = ?';
    return user.getUserId(username)
    .then (function(results) {
      console.log(results, 'results from get session key');
      return db.queryAsync(queryString, [results[0][0].id]);
    });
  },  

  deleteSession: function(sessionKey) {
    var queryString = 'delete from sessions where session_key = ?';
    return db.queryAsync(queryString, sessionKey);
  }

};
