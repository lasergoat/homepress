
<h1>Homepress</h1>

A simple approach to local development for Wordpress. Using this tool, you'll get a per-project installation of Wordpress using [Laravel's Homestead](http://laravel.com/docs/master/homestead).

<h2>Installation</h2>

Have the requirements met below, then simply run: 

    npm install -g homepress
    homepress start

*This will also ask if you want to add your new local dev site IP address to your hosts file. Hint: you do.*


<h2>Requirements</h2>


<h4>Have Node/NPM, Virtual Box and Vagrant</h4>

* [Node.js](https://nodejs.org/en/)
* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)
* [Have an ssh key](https://help.github.com/articles/generating-ssh-keys/) in your `~/.ssh/` directory


<h4>Also Have Composer</h4>

[Install composer globally](https://getcomposer.org/doc/00-intro.md#globally):

<pre>
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
</pre>


<h2>Other Commands</h2>

**Init Everything**: `homepress start` OR `homepress init`

**Update your WordPress Version**: `homepress wp-update`

**Generate new WordPress salts**: `homepress wp-salts`

**Install VM Only (because you already have WordPress**: `homepress vm-init`

**Start the VM**: `vagrant up`

**Stop/Halt the VM**: `vagrant halt`

**SSH into the VM**: `vagrant ssh`


<h2>Todo:</h2>

* finish the part that writes your host entry to /etc/hosts

<h2>Development</h2>

To test this locally, simply do this:

    npm install homepress
    cd ../
    mkdir test
    cd test
    npm install -g ../homepress/ && homepress start

