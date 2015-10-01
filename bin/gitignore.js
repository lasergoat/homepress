
module.exports = function(callback) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');
  var pwd = process.env.PWD;

  console.log('Generating .gitignore File');

  var file = path.join(pwd, '.gitignore');

  var newIgnores = [
    '.env',
    'Homestead.yaml',
    'Vagrantfile',
    'vendor',
    '.vagrant',
    'node_modules',
    'npm-debug.log',
    'readme.html',
    'license.txt',
    'index.php',
    'wp-activate.php',
    'wp-admin',
    'wp-blog-header.php',
    'wp-comments-post.php',
    'wp-config-sample.php',
    'wp-config.php',
    'wp-cron.php',
    'wp-includes',
    'wp-links-opml.php',
    'wp-load.php',
    'wp-login.php',
    'wp-mail.php',
    'wp-settings.php',
    'wp-signup.php',
    'wp-trackback.php',
    'xmlrpc.php',
  ];

  var currentIgnores = [];

  fs.stat(file, function(err, stats) {

    if (!err) {
      currentIgnores = fs.readFileSync(file).toString().split("\n");
    }

    var mergedIgnores = _.union(currentIgnores, newIgnores);

    fs.writeFile(file, mergedIgnores.join('\n'), function(err) {

      if(err) {
          return console.log(err);
      }

      console.log(".gitignore file created!");
      console.log("This will prevent things like the VM and the WordPress core files from getting into your git repo!");
      callback && callback();
    }); 

  });
}