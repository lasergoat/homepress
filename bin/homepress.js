#! /usr/bin/env node

var command = process.argv[2];
var path = require('path');

var execSync = require('child_process').execSync;

var steps = {
  init      : require(path.join(__dirname, 'init.js')),
  wordpress : require(path.join(__dirname, 'wordpress.js')),
  salts     : require(path.join(__dirname, 'salts.js')),
  vm        : require(path.join(__dirname, 'vm.js')),
  gitignore : require(path.join(__dirname, 'gitignore.js')),
}

switch(command) {

  case "debug":
    // steps.gitignore();
  break;

  case "start":
  case "init":
    steps.init(() => {

      steps.wordpress(() => {

        steps.gitignore();
        steps.salts();
        steps.vm(() => {
          console.log('ALL DONE.');
        });

      });
    });
  break;

  case "wp-update":
    steps.wordpress();
  break;

  case "wp-salts":
    steps.salts();
  break;

  case "vm-init":
    steps.vm();
  break;

  case "vm-start":
    execSync('vagrant up');
  break;

  case "vm-stop":
    execSync('vagrant halt');
  break;

  case "vm-ssh":
    execSync('vagrant ssh');
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

