
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

putInHostFileDefault="y"
read -p "Want me to put the host entry in your /etc/hosts file? [y/N]: " putInHostFile
putInHostFile=${putInHostFile:-$putInHostFileDefault}

if [ "$putInHostFile" == "y" ]
then
    echo "Get ready to type your password since the hosts file is protected."
    sudo /bin/sh -c 'echo "" >> /etc/hosts'
    sudo /bin/sh -c 'echo "$siteIp $siteName" >> /etc/hosts'
    echo "Ok, \"$siteIp $siteName\" was added to /etc/hosts"
    echo "Now visit http://$siteName in your browser"
else 
    echo "Ok, I didn't add it"
    echo "If you want to access your local dev site in the browser at: $siteName,"
    echo "then you'll need to add the following entry to the end of this file: /etc/hosts"
    echo ""
    echo ""
    echo "    $siteIp    $siteName"
    echo ""
    echo ""
    echo "Then, you can visit http://$siteName in your browser"
    echo "Otherwise, you can just visit $siteIp in your browser"
fi

echo "Done"
