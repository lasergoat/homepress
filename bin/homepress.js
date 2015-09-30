#! /usr/bin/env node

var command = process.argv[2];
// var execSync = require('child_process').execSync;

// console.log(process.env);
// execSync(`sh ${__dirname}/init.sh`);
// return;

switch(command) {

  case "start":
  case "init":
    var init = require(`${__dirname}/init.js`);

    // execSync(`sh ${__dirname}/vm-init.sh`);
  break;

  case "wp-update":
    var cmd = "sh wp-update.sh";
    execSync(cmd);
  break;

  case "wp-salts":
    var cmd = "php wp-salts.php";
    execSync(cmd);
  break;

  case "vm-init":
    var cmd = "sh vm-init.sh";
    execSync(cmd);
  break;

  case "vm-start":
    var cmd = "vagrant up";
    execSync(cmd);
  break;

  case "vm-stop":
    var cmd = "vagrant halt";
    execSync(cmd);
  break;

  case "vm-ssh":
    var cmd = "vagrant ssh";
    execSync(cmd);
  break;

  default:
    console.log("You didn't supply a proper command.");
    console.log("Use on of these: " + [
      "start",
      "init",
      "wp-update",
      "wp-salts",
      "vm-init",
      "vm-start",
      "vm-stop",
      "vm-ssh"
    ].join(', '));
  break;

}

