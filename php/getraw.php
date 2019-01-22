<?php

  $urlpage = $_GET["urlpage"];

  $ch = curl_init();

  curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
  

  curl_setopt($ch, CURLOPT_VERBOSE, 1);

  curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE );
  curl_setopt($ch, CURLOPT_HTTPGET, 1);
  curl_setopt($ch, CURLOPT_URL, $urlpage); 
  curl_setopt($ch, CURLOPT_HEADER, 1); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
  curl_setopt($ch, CURLOPT_TIMEOUT, 300);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE );

  curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, false );
  curl_setopt($ch, CURLOPT_DNS_CACHE_TIMEOUT, 2 );

  curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4 );

  $data = curl_exec($ch);
  if(curl_errno($ch)){
    echo 'Curl error: ' . curl_error($ch);
  }
  curl_close($ch);
  echo $data;
?>