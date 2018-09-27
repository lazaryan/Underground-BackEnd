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
$name = strip_tags(trim($_POST['name']));
$date = strip_tags(trim($_POST['date']));
$hours = strip_tags(trim($_POST['hours']));
$time = strip_tags(trim($_POST['time']));

mysql_query("UPDATE `table` SET person='$name', time='$time', timestatus=$hours, date='$date' WHERE id=$number");

/**
 * файл для добавления новых клиентов
 * данные передаются методом POST
 * параметры:
 * name - имя клиента
 * number - номер стола
 * hours - на сколько был заказан стол
 * date - время прихода
 */
 mysql_close();
?>