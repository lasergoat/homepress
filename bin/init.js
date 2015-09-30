var inquirer = require("inquirer");
var execSync = require('child_process').execSync;

console.log("\n-- HOMEPRESS --\n");
console.log("\nContinuing this process will delete your WP files");
console.log("(This won't affect your wp-content like plugins and non-default themes)");

inquirer.prompt([{
    type: 'confirm',
    default: 'y',
    message: 'Are you sure you want to continue? ',
    name: 'continuePref'
}], function( answers ) {

    if (answers.continuePref) {
        getTheme();
    } else {
        console.log('Ok, Exiting...');
        process.exit();
    }

});

var theme = null;
var getTheme = function() {

    inquirer.prompt([{
        type: 'input',
        default: 'theme',
        message: 'What is the name of your theme directory? ',
        name: 'themeName'
    }], function( answers ) {
        theme = answers.themeName;
        installWordPress();
    });
}

var installWordPress = function() {

    var AdmZip = require('adm-zip');
    var http = require('http');
    var fs = require('fs');
    var request = require('request');
    var pwd = process.env.PWD;
    var zipFileName = `${pwd}/wordpress.zip`;
    var unzipDir = `${pwd}/unzip`;
    // var out = fs.createWriteStream(zipFileName);
    var path = require('path');

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
    files.map(file => {execSync(`rm -rf ${pwd}/${file}`)});

    console.log("Installing WordPress...");

    // Downloading WordPress
    // var req = request('https://github.com/WordPress/WordPress/archive/master.zip');

    // req.pipe(out);
    // req.on('end', function() {

      var zip = new AdmZip(zipFileName),
      zipEntries = zip.getEntries();
      zip.extractEntryTo(unzipDir, true);
      // console.log(zipEntries);
      // zip.getEntryChildren
      // zipEntries.forEach(function(zipEntry) {
      //   console.log(zipEntry.toString());
      // });
      // var dirs = fs.readdirSync(unzipDir).filter(function(file) {
      //   return fs.statSync(path.join(unzipDir, file)).isDirectory();
      // });
      // console.log(dirs);

    // });

    // execSync(`${process.env._}/node_modules/napa WordPress/WordPress`);
    // execSync(`rsync -dr ${pwd}/node_modules/WordPress/* ${pwd}/.`);
    // execSync(`rm -rf ${pwd}/node_modules/WordPress`);
    // execSync(`cp ${pwd}/wp-config-sample.php ${pwd}/wp-config.php`);


}
