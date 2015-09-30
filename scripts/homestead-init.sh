
echo "What is the name of your local dev site? (eg. homepress.local)"
read siteName

rm -rf .vagrant
rm Vagrantfile 
rm Homestead.yaml

# install the VM
echo "Installing the VM (homestead)..."
napa laravel/homestead
composer install
php vendor/bin/homestead make
sed -i '' -e"s/homestead\.app/$siteName/" Homestead.yaml
vagrant up

echo "Don't forget to the following line to your /etc/hosts file"
echo "192.168.10.10   homepress.local"
echo "Visit http://$siteName OR 192.168.10.10 in your browser"
echo "Done."
