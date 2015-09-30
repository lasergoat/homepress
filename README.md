
#Homepress

A simple approach to local development for Wordpress. Using this tool, you'll get a per-project installation of Wordpress using [Laravel's Homestead](http://laravel.com/docs/master/homestead).

Download a [zip](https://github.com/lasergoat/homepress/archive/master.zip) of the project and then `cd /path/to/homepress.


##Installation

Simply run: `npm run init`

To update wordpress, run `npm run wp-update`. 

To just make new salts, run `npm run wp-salts`.


##Requirements


####Composer

[Install composer globally](https://getcomposer.org/doc/00-intro.md#globally):

<pre>
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
</pre>


####Node/NPM, Virtual Box and Vagrant

* [Node.js](https://nodejs.org/en/)
* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)

