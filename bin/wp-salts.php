<?php

$saltUrl = 'https://api.wordpress.org/secret-key/1.1/salt/';
$wpConfigFileName = 'wp-config.php';

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $saltUrl);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER, false);

$str = curl_exec($curl);

curl_close($curl);

// make salts into array
$salts = explode("\n", $str);

// get lines of config file
$lines = file($wpConfigFileName);
$found = false;

// once the first salt is found, replace it with the 
// first index of the array of new salts
// until all the salts are gone
$i = 0;
while( count($salts) )
{
    if ($found || strpos($lines[$i], 'define(\'AUTH_KEY') !== false )
    {
        $found = true;
        $lines[$i] = array_shift($salts) . "\n";
    }
    $i++;
}

// now put that array of lines back into the file
file_put_contents($wpConfigFileName, implode('', $lines));
