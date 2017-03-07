var Promise = require('bluebird');
var request = Promise.promisify(require('request'), { multiArgs: true });
var crypto = require('crypto');
var hash = crypto.createHash('sha1');

exports.getUrlTitle = function(url) {
  return request(url).then(function(response, html) {
    var tag = /<title>(.*)<\/title>/;
    var match = response[0].body.match(tag);
    var title = match ? match[1] : url;
    return title;
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/


//use crypto methods to secure username and password information

exports.hashing = function (string) {
  hash.update(string);
  return hash.digest('hex');
};
