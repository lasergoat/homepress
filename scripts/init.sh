
# install napa
npm install

# install and move wordpress
napa WordPress/WordPress
mv node_modules/WordPress/* .
rm -rf node_modules/WordPress
cp wp-config-sample.php wp-config.php
php wp-salts.php
# use sed to change the DB configs
sed -i "/DB_HOST/s/'[^']*'/'localhost'/2" wp-config.php
sed -i "/DB_NAME/s/'[^']*'/'homestead'/2" wp-config.php
sed -i "/DB_USER/s/'[^']*'/'homestead'/2" wp-config.php
sed -i "/DB_PASSWORD/s/'[^']*'/'secret'/2" wp-config.php

# install the VM
napa laravel/homestead
composer install
php vendor/bin/homestead make
vagrant up