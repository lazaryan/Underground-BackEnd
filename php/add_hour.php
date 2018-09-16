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
$value= strip_tags(trim($_POST['value']));


mysql_query("UPDATE unced SET timestatus=$value WHERE id=$number");
/**
 * файл для добавления времени к заказу
 * запрос идет методом POST
 * параметры:
 * number - номер стола
 * value - новое значение
 */
mysql_close();
?>