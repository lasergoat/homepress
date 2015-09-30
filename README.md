
#Homepress

A simple approach to local development for Wordpress. Using this tool, you'll get a per-project installation of Wordpress using [Laravel's Homestead](http://laravel.com/docs/master/homestead).

Download a [zip](https://github.com/lasergoat/homepress/archive/master.zip) of the project and then `cd /path/to/homepress.


##Installation

Have the requirements met below, then simply run: 

    npm install -g homepress
    homepress start

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

**Init Everything**: `homepress start` OR `homepress init`

**Update your WordPress Version**: `homepress wp-update`

**Generate new WordPress salts**: `homepress wp-salts`

**Install VM Only (because you already have WordPress**: `homepress vm-init`

**Start the VM**: `vagrant up`

**Stop/Halt the VM**: `vagrant halt`

**SSH into the VM**: `vagrant ssh`


##Todo:

* finish the part that writes your host entry to /etc/hosts