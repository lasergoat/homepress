
module.exports = function(callback) {

  var execSync = require('child_process').execSync;
  var path = require('path');
  var crypto = require('crypto');
  var replace = require('replace');

  console.log('Generating Salts');

  var pwd = process.env.PWD;

  var salt = () => crypto.randomBytes(30).toString('hex');

  [
    'AUTH_KEY',
    'SECURE_AUTH_KEY',
    'LOGGED_IN_KEY',
    'NONCE_KEY',
    'AUTH_SALT',
    'SECURE_AUTH_SALT',
    'LOGGED_IN_SALT',
    'NONCE_SALT',
  ].map(define => {

    // loop the correct number of defines.
    // each time this will replace only the first occurance of the string: "put your unique phrase here"
    replace({
      regex: /put your unique phrase here/,
      replacement: salt(),
      paths: [path.join(pwd, 'wp-config.php')],
      recursive: false,
      silent: true
    });
  });

  callback && callback();
}