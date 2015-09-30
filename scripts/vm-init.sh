
siteNameDefault="homepress.app"
read -p "Which local url should it live at? [leave blank for $siteNameDefault]: " siteName 
siteName=${siteName:-$siteNameDefault}

siteIpDefault="192.168.10.10"
read -p "Which local IP would you like to use? [leave blank for $siteIpDefault]: " siteIp 
siteIp=${siteIp:-$siteIpDefault}

echo "If you had an existing VM here, you need to tell vagrant whether to remove it"
echo "before the new one is built. Hint: answer yes"
vagrant -f destroy
rm -rf .vagrant
rm Vagrantfile
rm Homestead.yaml

# install the VM
echo "Installing the VM (homestead)..."
composer install
php vendor/bin/homestead make
sed -i '' -e"s/homestead\.app/$siteName/" Homestead.yaml
sed -i '' -e"s/192.168.10.10/$siteIp/" Homestead.yaml
sed -i '' -e"s/home\/vagrant\/homepress\/public/home\/vagrant\/homepress/" Homestead.yaml
vagrant up

echo "Don't forget to the following line to your /etc/hosts file"
echo "$siteIp homepress.local"
echo "Visit http://$siteName OR $siteIp in your browser"
