
module.exports = function(callback) {

  var execSync = require('child_process').execSync;
  var AdmZip = require('adm-zip');
  var fs = require('fs');
  var path = require('path');
  var download = require(path.join(__dirname, 'download'));

  var pwd = process.env.PWD;
  var zipFile = path.join(pwd, 'wordpress.zip');
  var unzipDir = path.join(pwd,'unzip');

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
  execSync(`rm -rf ${zipFile}`);
  execSync(`rm -rf ${unzipDir}`);

  console.log("Downloading WordPress...");

  // Downloading WordPress

  download('https://github.com/WordPress/WordPress/archive/master.zip', zipFile, err => {

    console.log("Installing WordPress...");
    var zip = new AdmZip(zipFile);
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
    execSync(`rm -rf ${zipFile}`);
    execSync(`rm -rf ${unzipDir}`);
    execSync(`cp ${path.join(pwd, 'wp-config-sample.php')} ${path.join(pwd, 'wp-config.php')}`);
    console.log('WordPress Installed');
    callback && callback();
  });

}