
#Homepress

A simple approach to local development for Wordpress. Using this tool, you'll get a per-project installation of Wordpress using [Laravel's Homestead](http://laravel.com/docs/master/homestead).

Download a [zip](https://github.com/lasergoat/homepress/archive/master.zip) of the project and then `cd /path/to/homepress.


##Installation

Simply run: `npm run init`

To update wordpress, run `npm run wp-update`. 

To just make new salts, run `npm run wp-salts`.

If you already have wordpress but want the VM, run `npm run vm-init`.

####Hosts File

When it asks for your site name, make sure to add that to your hosts file also. `sudo nano etc/hosts`

I typed `homepress.local`, so I add this to the bottom of my file:

    192.168.10.10   homepress.local


##Requirements


####Have Composer

[Install composer globally](https://getcomposer.org/doc/00-intro.md#globally):

<pre>
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
</pre>


####Have Node/NPM, Virtual Box and Vagrant

* [Node.js](https://nodejs.org/en/)
* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)


#TODO: 

* find a way to make this work by `npm install homepress`
  * that way homepress can live in the node_modules folder
* make homepress generate a custom .gitignore file
  * to ignore the WP core files
