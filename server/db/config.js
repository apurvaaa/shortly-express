var Promise = require('bluebird');

module.exports = function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table
  return db.queryAsync('CREATE TABLE IF NOT EXISTS links (\
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
    url VARCHAR(255),\
    baseUrl VARCHAR(255),\
    code VARCHAR(5),\
    title VARCHAR(255),\
    visits INT NOT NULL DEFAULT 0,\
    timestamp TIMESTAMP\
    );')
  .then(function() {
    // Create clicks table
    return db.queryAsync('CREATE TABLE IF NOT EXISTS clicks (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      linkId INT,\
      timestamp TIMESTAMP\
      );');
  })
  .then(function() {
    // Create clicks table
    return db.queryAsync('CREATE TABLE IF NOT EXISTS users (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      username VARCHAR(20) not null unique, \
      password CHAR(40) \
      );');
    //add salt at a later date
  })
  /************************************************************/
  /*          Add additional schema queries here              */
  /************************************************************/
  //make a sessions table 




  .error(function(err) {
    console.log(err);
  });
};
