
# get theme directory name
echo "What is the name of your theme directory?"
read themeName

echo "Continuing this process will delete your WP files"
echo "(This won't affect your wp-content like plugins and non-default themes)"
echo "Control+C to quit now or hit enter to continue"
read ok

rm -rf index.php
rm -rf license.txt
rm -rf readme.html
rm -rf wp-activate.php
rm -rf wp-admin
rm -rf wp-blog-header.php
rm -rf wp-comments-post.php
rm -rf wp-config-sample.php
rm -rf wp-cron.php
rm -rf wp-includes
rm -rf wp-links-opml.php
rm -rf wp-load.php
rm -rf wp-login.php
rm -rf wp-mail.php
rm -rf wp-settings.php
rm -rf wp-signup.php
rm -rf wp-trackback.php
rm -rf xmlrpc.php

echo "Installing Napa..."
# install napa
npm install

# install and move wordpress
echo "Installing WordPress..."
napa WordPress/WordPress
rsync -dr node_modules/WordPress/* .
rm -rf node_modules/WordPress
cp wp-config-sample.php wp-config.php

echo "Generating Salts..."
php scripts/wp-salts.php

echo "Configuring WordPress Database..."

# use sed to change the DB configs
sed -i '' "/DB_HOST/s/'[^']*'/'localhost'/2" wp-config.php
sed -i '' "/DB_NAME/s/'[^']*'/'homestead'/2" wp-config.php
sed -i '' "/DB_USER/s/'[^']*'/'homestead'/2" wp-config.php
sed -i '' "/DB_PASSWORD/s/'[^']*'/'secret'/2" wp-config.php

echo "Making Alias to your theme..."
mkdir -p wp-content/themes/$themeName
ln -s wp-content/themes/$themeName theme

sh scripts/homestead-init.sh