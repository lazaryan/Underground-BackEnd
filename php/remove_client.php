<?php 
$db_host     = "localhost";
$db_username = "root";
$db_password = "";
$db_name     = "unced";
$db_charset  = "utf8";

$con = mysql_connect($db_host, $db_username, $db_password);
$db = mysql_select_db($db_name);
mysql_set_charset($db_charset);

if (!$con || !$db) {
  mysql_error();
}

$number= strip_tags(trim($_POST['number']));

$result = mysql_query("SELECT * FROM unced WHERE id=$number");

$row = mysql_fetch_array($result);
$name=$row['person'];
$time=$row['time'];
$timestatus=$row['timestatus'];
$prise=$row['prise'];
$sum=$timestatus*$prise;

mysql_query(" INSERT INTO Otchet (person, time, summa) VALUES ('$name','$time', $sum)");

mysql_query("UPDATE unced SET person=null, time=null, timestatus=0 WHERE id=$number");
mysql_close();
?>
