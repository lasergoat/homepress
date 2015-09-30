
module.exports = function(callback) {

  var inquirer = require("inquirer");

  console.log("\n-- HOMEPRESS --\n");
  console.log("\nContinuing this process will delete your WP files");
  console.log("(This won't affect your wp-content plugins or non-default themes)");

  inquirer.prompt([
    {
      type: 'confirm',
      default: 'y',
      message: 'Are you sure you want to continue? ',
      name: 'continuePref'
    }
  ], function( options ) {

    if (options.continuePref) {
      callback && callback();
    } else {
      console.log('Ok, Exiting...');
      process.exit();
    }

  });

}
