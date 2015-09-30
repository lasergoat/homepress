
module.exports = function(callback) {

  var execSync = require('child_process').execSync;
  var inquirer = require("inquirer");
  var path = require('path');
  var pwd = process.env.PWD;

  console.log('Initializing VM (homestead)');

  execSync(`sed -i '' "/DB_HOST/s/'[^']*'/'localhost'/2" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' "/DB_NAME/s/'[^']*'/'homestead'/2" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' "/DB_USER/s/'[^']*'/'homestead'/2" ${path.join(pwd, 'wp-config.php')}`);
  execSync(`sed -i '' "/DB_PASSWORD/s/'[^']*'/'secret'/2" ${path.join(pwd, 'wp-config.php')}`);

  var options = null;

  inquirer.prompt([
    {
      type: 'input',
      default: 'homepress.app',
      message: 'Which local url should it live at? ',
      name: 'siteName'
    }, {
      type: 'input',
      default: '192.168.10.10',
      message: 'Which local IP should it use? ',
      name: 'siteIp'
    }
  ], answers => {
    options = answers;
    destroyVm();
  });

  function destroyVm() {

    console.log('Removing old Vagrant VM');
    var vagrantDestroy = require('child_process').spawn('bash');

    vagrantDestroy.stdout.on('data', function (data) {
        console.log('' + data);
    });

    vagrantDestroy.stderr.on('data', function (data) {
        console.log('' + data);
    });

    vagrantDestroy.on('exit', function (code) {

        console.log('vagrant process exited with code ' + code);
        removeFiles();
    });

    vagrantDestroy.stdin.write('vagrant destroy\n');
    vagrantDestroy.stdin.end();
  }

  function removeFiles() {
    
    console.log('Removing Old VM Files');
    execSync(`rm -rf ${path.join(pwd, '.vagrant')}`);
    execSync(`rm -f ${path.join(pwd, 'Vagrantfile')}`);
    execSync(`rm -f ${path.join(pwd, 'Homestead.yaml')}`);

    composerInstall();
  }

  function composerInstall() {

    console.log('Installing Homestead VM');
    var composer = require('child_process').spawn('bash');

    composer.stdout.on('data', function (data) {
        console.log('' + data);
    });

    composer.stderr.on('data', function (data) {
        console.log('' + data);
    });

    composer.on('exit', function (code) {

        console.log('composer process exited with code ' + code);
        homesteadMake();
    });

    composer.stdin.write('composer require laravel/homestead --dev\n');
    composer.stdin.write('composer install\n');
    composer.stdin.end();
  }

  function homesteadMake() {

    console.log('Building Homestead VM');

    var homestead = require('child_process').spawn('bash');

    homestead.stdout.on('data', function (data) {
        console.log('' + data);
    });

    homestead.stderr.on('data', function (data) {
        console.log('' + data);
    });

    homestead.on('exit', function (code) {

        console.log('homestead process exited with code ' + code);
        homesteadConfigure();
    });

    homestead.stdin.write(`${path.join(pwd, 'vendor/bin/homestead')} make\n`);
    homestead.stdin.end();
  }

  function homesteadConfigure() {

    console.log('Configuring Homestead VM');

    execSync(`sed -i '' -e"s/homestead.app/${options.siteName}/" ${path.join(pwd, 'Homestead.yaml')}`);
    execSync(`sed -i '' -e"s/192.168.10.10/${options.siteIp}/" ${path.join(pwd, 'Homestead.yaml')}`);
    execSync(`sed -i '' -e"s/\\/public/\\//" ${path.join(pwd, 'Homestead.yaml')}`);

    vagrantUp();
  }

  function vagrantUp() {

    console.log('Bringing Vagrant VM Online');
    var vagrantUp = require('child_process').spawn('bash');

    vagrantUp.stdout.on('data', function (data) {
        console.log('' + data);
    });

    vagrantUp.stderr.on('data', function (data) {
        console.log('' + data);
    });

    vagrantUp.on('exit', function (code) {

        console.log('vagrant up process exited with code ' + code);
        writeHostFile();
    });

    vagrantUp.stdin.write('vagrant up\n');
    vagrantUp.stdin.end();
  }

  function writeHostFile() {

    // putInHostFileDefault="y"
    // read -p "Want me to put the host entry in your /etc/hosts file? [y/N]: " putInHostFile
    // putInHostFile=${putInHostFile:-$putInHostFileDefault}

    // if [ "$putInHostFile" == "y" ]
    // then
    //     echo "Get ready to type your password since the hosts file is protected."
    //     sudo /bin/sh -c 'echo "" >> /etc/hosts'
    //     sudo /bin/sh -c 'echo "$siteIp $siteName" >> /etc/hosts'
    //     echo "Ok, \"$siteIp $siteName\" was added to /etc/hosts"
    //     echo "Now visit http://$siteName in your browser"
    // else 
    //     echo "Ok, I didn't add it"
    //     echo "If you want to access your local dev site in the browser at: $siteName,"
    //     echo "then you'll need to add the following entry to the end of this file: /etc/hosts"
    //     echo ""
    //     echo ""
    //     echo "    $siteIp    $siteName"
    //     echo ""
    //     echo ""
    //     echo "Then, you can visit http://$siteName in your browser"
    //     echo "Otherwise, you can just visit $siteIp in your browser"
    // fi

    // echo "Done"

    callback && callback();
  }

}
