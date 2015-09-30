
module.exports = function(callback) {

  var execSync = require('child_process').execSync;
  var path = require('path');
  var crypto = require('crypto');

  console.log('Generating Salts');

  var pwd = process.env.PWD;

  var salt = () => crypto.randomBytes(30).toString('hex');

  execSync(`sed -i '' -e "s/AUTH_KEY',         'put your unique phrase here/AUTH_KEY',         '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/SECURE_AUTH_KEY',  'put your unique phrase here/SECURE_AUTH_KEY',  '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/LOGGED_IN_KEY',    'put your unique phrase here/LOGGED_IN_KEY',    '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/NONCE_KEY',        'put your unique phrase here/NONCE_KEY',        '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/AUTH_SALT',        'put your unique phrase here/AUTH_SALT',        '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/SECURE_AUTH_SALT', 'put your unique phrase here/SECURE_AUTH_SALT', '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/LOGGED_IN_SALT',   'put your unique phrase here/LOGGED_IN_SALT',   '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' -e "s/NONCE_SALT',       'put your unique phrase here/NONCE_SALT',       '${salt()}/" ${path.join(pwd, 'wp-config.php')}`);

  callback && callback();
}