
#Homepress

A simple approach to local development for Wordpress. Using this tool, you'll get a per-project installation of Wordpress using [Laravel's Homestead](http://laravel.com/docs/master/homestead).

Download a [zip](https://github.com/lasergoat/homepress/archive/master.zip) of the project and then `cd /path/to/homepress.


##Installation

Have the requirements met below, then simply run: 

    npm start

*This will also ask if you want to add your new local dev site IP address to your hosts file. Hint: you do.*


##Requirements


####Have Node/NPM, Virtual Box and Vagrant

* [Node.js](https://nodejs.org/en/)
* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)
* [Have an ssh key](https://help.github.com/articles/generating-ssh-keys/) in your `~/.ssh/` directory


####Also Have Composer

[Install composer globally](https://getcomposer.org/doc/00-intro.md#globally):

<pre>
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
</pre>


##Other Commands

**Init Everything**: `npm start` OR `npm run init`

**Update your WordPress Version**: `npm run wp-update`

**Generate new WordPress salts**: `npm run wp-salts`

**Install VM Only (because you already have WordPress**: `npm run vm-init`

**Start the VM**: `npm run vm-start`

**Stop/Halt the VM**: `npm run vm-stop`

**SSH into the VM**: `npm run vm-ssh`


#TODO: 

* find a way to make this work by `npm install homepress`
  * that way homepress can live in the node_modules folder
* make homepress generate a custom .gitignore file
  * to ignore the WP core files
