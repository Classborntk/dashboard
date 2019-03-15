<?php



  $urlpage = $_GET["urlpage"];

  $ch = curl_init(); 
  curl_setopt($ch, CURLOPT_URL, $urlpage); 
  curl_setopt($ch, CURLOPT_HEADER, 0); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
  curl_setopt($ch, CURLOPT_TIMEOUT, 300);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

  curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
  curl_setopt($ch, CURLOPT_AUTOREFERER, true); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_VERBOSE, 1);

  $data = str_replace("'",'´',curl_exec($ch));
  $result = strstr($data, '{');
  
  curl_close($ch); 
  echo '<!DOCTYPE html><html><head><script type="text/javascript"> ';
  echo " function onloadPage() { window.parent.postMessage('" . preg_replace( "/\r|\n/", "", $result ) . "', '*'); } ";
  echo ' </script></head><body onload="return onloadPage()"></body></html>';

?>