
module.exports = function(callback) {

  var execSync = require('child_process').execSync;
  var AdmZip = require('adm-zip');
  var http = require('http');
  var fs = require('fs');
  var request = require('request');
  var path = require('path');

  var pwd = process.env.PWD;
  var zipFileName = path.join(pwd, 'wordpress.zip');
  var unzipDir = path.join(pwd,'unzip');
  var out = fs.createWriteStream(zipFileName);

  var files = [
      'index.php',
      'license.txt',
      'readme.html',
      'wp-activate.php',
      'wp-admin',
      'wp-blog-header.php',
      'wp-comments-post.php',
      'wp-config-sample.php',
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

  // don't bother using node's unlink 
  // since it can't handle non empty directories
  files.map(file => {execSync(`rm -rf ${path.join(pwd, file)}`)});

  // remove any existing zip file or temp directory
  execSync(`rm -rf ${zipFileName}`);
  execSync(`rm -rf ${unzipDir}`);

  console.log("Downloading WordPress...");

  // Downloading WordPress
  var req = request('https://github.com/WordPress/WordPress/archive/master.zip');

  req.pipe(out);
  req.on('end', function() {

    console.log("Installing WordPress...");
    var zip = new AdmZip(zipFileName);
    zip.extractAllTo(unzipDir);

    var dirs = fs.readdirSync(unzipDir).filter(
      file => fs.statSync(path.join(unzipDir, file)).isDirectory()
    );

    if (dirs.length > 1) {
      console.log('The zip file did not include one directory like it ought to');
      process.exit(1);
    }

    var tempWordpressDir = path.join(unzipDir, dirs[0], '*');

    execSync(`rsync -dr ${tempWordpressDir} ${path.join(pwd, '.')}`);
    execSync(`rm -rf ${zipFileName}`);
    execSync(`rm -rf ${unzipDir}`);
    execSync(`cp ${path.join(pwd, 'wp-config-sample.php')} ${path.join(pwd, 'wp-config.php')}`);
    console.log('WordPress Installed');
    callback && callback();

  });

}