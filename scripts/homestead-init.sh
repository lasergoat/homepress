
echo "What is the name of your local dev site? (eg. blah.local)"
read siteName

# install the VM
echo "Installing the VM (homestead)..."
napa laravel/homestead
composer install
php vendor/bin/homestead make
sed -i '' -e"s/homestead\.app/$siteName/" Homestead.yaml
vagrant up

echo "Vistit http://$siteName in your browser"
echo "Done."
