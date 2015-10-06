
<h1>Homepress</h1>

A simple approach to local development for WordPress. Using this tool, you'll get a per-project installation of WordPress using [Laravel's Homestead](http://laravel.com/docs/master/homestead).

<h2>Installation</h2>

Have the requirements met below, then simply run: 

    npm install -g homepress
    homepress start

*During install, `Homestead` will ask if you want to add your new local dev site IP address to your hosts file. Hint: you do.* 


<h2>Requirements</h2>


<h4>Have Node/NPM, Virtual Box and Vagrant</h4>

* Be on OSX or Linux (until someone does a PR for Windows)
* [Node.js](https://nodejs.org/en/)
* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)
* [Have an ssh key](https://help.github.com/articles/generating-ssh-keys/) in your `~/.ssh/` directory

If you already have node, [update it](http://davidwalsh.name/upgrade-nodejs):

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable


<h4>Also Have Composer</h4>

[Install composer globally](https://getcomposer.org/doc/00-intro.md#globally):

<pre>
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
</pre>

If you already had composer, update it! `composer self-update`.

<h2>Other Commands</h2>

**Init Everything**: `homepress start` OR `homepress init`

**Update your WordPress Version**: `homepress wp-update`

**Generate new WordPress salts**: `homepress wp-salts`

**Install VM Only (because you already have WordPress)**: `homepress vm-init`

**Start the VM**: `vagrant up`

**Stop/Halt the VM**: `vagrant halt`

**SSH into the VM**: `vagrant ssh`


<h2>Bonus: Connecting to MySQL Manually</h2>

If you use a tool like [Sequel Pro](http://www.sequelpro.com/download), you'll want to use these connection settings to connect to Mysql within the VM.

**Setup connection details:**

* Use an SSH connection (not standard)
* MySQL Host: 10.0.2.15
* User: homestead
* Password: secret
* Database: homestead
* Port: blank
* SSH Host: 192.168.10.10**
* SSH User: vagrant
* SSH Key: `~/.ssh/id_rsa` (this is your host computer key)
* SSH Port: blank

`**` This IP is what you typed in during `homepress start` when it asked which IP you want your VM to live at.


<h2>Development</h2>

To develop and test this locally, simply do this:

    git clone https://github.com/lasergoat/homepress.git
    cd homepress
    npm install
    cd ../
    mkdir test
    cd test

Then, every time you edit a file in homepress, run this command:

    cd ../homepress && npm link && cd ../test && homepress start

This will avoid creating vm and WordPress files within the homepress directory