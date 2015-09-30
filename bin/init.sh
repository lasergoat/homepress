
echo ""
echo "$PWD"
exit 0

# get theme directory name
read -p "What is the name of your theme directory? " themeName

echo "Continuing this process will delete your WP files"
echo "(This won't affect your wp-content like plugins and non-default themes)"

continuePrefDefault="y"
read -p "Want to continue? [y/N]: " continuePref
continuePref=${continuePref:-$continuePrefDefault}

if [ "$continuePref" != "y" ]
then
    echo "Exiting..."
    exit 0
fi

rm -rf $PWD/index.php
rm -rf $PWD/license.txt
rm -rf $PWD/readme.html
rm -rf $PWD/wp-activate.php
rm -rf $PWD/wp-admin
rm -rf $PWD/wp-blog-header.php
rm -rf $PWD/wp-comments-post.php
rm -rf $PWD/wp-config-sample.php
rm -rf $PWD/wp-cron.php
rm -rf $PWD/wp-includes
rm -rf $PWD/wp-links-opml.php
rm -rf $PWD/wp-load.php
rm -rf $PWD/wp-login.php
rm -rf $PWD/wp-mail.php
rm -rf $PWD/wp-settings.php
rm -rf $PWD/wp-signup.php
rm -rf $PWD/wp-trackback.php
rm -rf $PWD/xmlrpc.php

echo "Installing Napa..."
# install napa. most people don't have wget, but everyone has npm 
# if they are using this package
npm install

# install and move wordpress
echo "Installing WordPress..."
napa WordPress/WordPress
rsync -dr $PWD/node_modules/WordPress/* $PWD/.
rm -rf $PWD/node_modules/WordPress
cp $PWD/wp-config-sample.php $PWD/wp-config.php

echo "Generating Salts..."
php $_scripts/wp-salts.php

echo "Configuring WordPress Database..."

# use sed to change the DB configs
sed -i '' "/DB_HOST/s/'[^']*'/'localhost'/2" wp-config.php
sed -i '' "/DB_NAME/s/'[^']*'/'homestead'/2" wp-config.php
sed -i '' "/DB_USER/s/'[^']*'/'homestead'/2" wp-config.php
sed -i '' "/DB_PASSWORD/s/'[^']*'/'secret'/2" wp-config.php

echo "Making Alias to your theme..."
mkdir -p wp-content/themes/$themeName
ln -s wp-content/themes/$themeName theme

