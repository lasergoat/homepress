siteIp=192.168.10.10
siteName=homepress.goat

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
