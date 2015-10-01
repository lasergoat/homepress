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
    steps.wordpress();
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
    steps.wordpress(() => console.log('ALL DONE.'));
  break;

  case "wp-salts":
    steps.salts(() => console.log('ALL DONE.'));
  break;

  case "vm-init":
    steps.vm(() => console.log('ALL DONE.'));
  break;

  default:
    console.log("You didn't supply a proper command.");
    console.log("Use on of these: " + [
      "start",
      "init",
      "wp-update",
      "wp-salts",
      "vm-init"
    ].join(', '));
  break;

}

