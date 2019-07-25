<?php
require_once 'PHPGangsta/GoogleAuthenticator.php';
 $oneCode='';
$websiteTitle = 'MyWebsite';
 
$ga = new PHPGangsta_GoogleAuthenticator();
 
$secret = $ga->createSecret();
//echo 'Secret is: '.$secret.'<br />';
 
$qrCodeUrl = $ga->getQRCodeGoogleUrl($websiteTitle, $secret);
echo '<br /><img src='.$qrCodeUrl.' />';
 
$myCode = $ga->getCode($secret);
//echo 'Verifying Code '.$myCode.'<br />';
 
//third parameter of verifyCode is a multiplicator for 30 seconds clock tolerance 
$result = $ga->verifyCode($secret, $oneCode, 1);
if ($result) {
 //  echo 'Verified';
} else {
  // echo 'Not verified';
}

?>