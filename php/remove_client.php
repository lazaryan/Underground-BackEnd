<?php 
$db_host     = "localhost";
$db_username = "f0237105_Table1";
$db_password = "1234";
$db_name     = "f0237105_Table";
$db_charset  = "utf8";

$con = mysql_connect($db_host, $db_username, $db_password);
$db = mysql_select_db($db_name);
mysql_set_charset($db_charset);

if (!$con || !$db) {
  mysql_error();
}

$number= strip_tags(trim($_POST['number']));
$sum=strip_tags(trim($_POST['prise']));
$result = mysql_query("SELECT * FROM `table` WHERE id=$number");

$row = mysql_fetch_array($result);
$name=$row['person'];
$time=$row['time'];
$date=$row['date'];

mysql_query(" INSERT INTO `otchet` (person, time, summa, date) VALUES ('$name','$time', $sum, '$date')");

mysql_query("UPDATE `table` SET person=null, time=null, timestatus=0, date=null WHERE id=$number");
mysql_close();
?>
