
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

  function terminalProcess(command, cb) {

    var tty = require('child_process').spawn('bash');

    tty.stdout.on('data', function (data) {
      data != '\n' && console.log('' + data);
    });

    tty.stderr.on('data', function (data) {
      data != '\n' && console.log('' + data);
    });

    tty.on('exit', function (code) {

      console.log(` "${command}" process exited with code ${code}`);
      cb();
    });

    tty.stdin.write(`${command}\n`);
    tty.stdin.end();
  }

  console.log("");
  console.log("Choose a url and IP address you aren't already using");
  inquirer.prompt([
    {
      type: 'input',
      default: 'homepress.app',
      message: "Which local url should it live at? ",
      name: 'siteName'
    }, {
      type: 'input',
      default: '192.168.10.10',
      message: 'Which local IP should it use? ',
      name: 'siteIp'
    }
  ], answers => {
    options = answers;
    
    console.log('Removing old Vagrant VM');
    terminalProcess('vagrant destroy --force', () => {

      console.log('Removing Old VM Files');
      execSync(`rm -rf ${path.join(pwd, '.vagrant')}`);
      execSync(`rm -f ${path.join(pwd, 'Vagrantfile')}`);
      execSync(`rm -f ${path.join(pwd, 'Homestead.yaml')}`);

      requireHomestead();
    });
  });

  function requireHomestead() {

    console.log('Requiring Homestead VM');
    terminalProcess('composer require laravel/homestead --dev', () => {

      console.log('Installing Homestead VM');
      terminalProcess('composer install', () => {

        console.log('Building Homestead VM');
        terminalProcess(`${path.join(pwd, 'vendor/bin/homestead')} make`, () => {
          
          homesteadConfigure();
        });
      });
    });
  }

  function homesteadConfigure() {

    console.log('Configuring Homestead VM');

    execSync(`sed -i '' -e"s/homestead.app/${options.siteName}/" ${path.join(pwd, 'Homestead.yaml')}`);
    execSync(`sed -i '' -e"s/192.168.10.10/${options.siteIp}/" ${path.join(pwd, 'Homestead.yaml')}`);
    execSync(`sed -i '' -e"s/\\/public/\\//" ${path.join(pwd, 'Homestead.yaml')}`);

    console.log('Bringing Homestead VM Online');
    terminalProcess('vagrant up', () => {

      console.log('Building Homestead VM');
      console.log("Get ready to type your password during this next step");
      terminalProcess('vagrant up', () => {

        console.log(`\n\nOk, ${options.siteIp} ${options.siteName} should have been added to /etc/hosts`);
        console.log("If not, you'll need to add it your self. Or visit the IP address in your browser");
        console.log('');
        console.log(`Now visit http://${options.siteName} in your browser`);

        callback && callback();

      });
    });
  }

}
