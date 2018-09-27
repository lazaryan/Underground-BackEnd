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

$result = mysql_query("SELECT * FROM `otchet`");

while ($row = mysql_fetch_array($result))
{
  $name[]=$row['person'];
  $time[]=$row['time'];
  $date[]=$row['date'];
  $summa[]=$row['summa'];
  $id[]=$row['id'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta   charset="UTF-8">
    	<meta   name="viewport"
            	content="width=device-width, user-scalable=no, 
                    initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    	<meta   http-equiv="X-UA-Compatible"
            	content="ie=edge">

	<title>Report</title>

	<link rel="stylesheet" type="text/css" href="css/report.css">
</head>
<body>
	<div class="content">
		<h1 class="report__title">Отчет</h1>

		<table class="table">
			<thead class="table__head">
				<tr class="table__item table__head-line">
					<th class="table__text">№</th>
					<th class="table__text">Имя</th>
					<th class="table__text">Дата</th>
					<th class="table__text">Время прихода</th>
					<th class="table__text">Счет </th>
				</tr>
			</thead>
			<tbody>
			    <?php  for ($a=0; $a<count($name);$a++):?>
				<tr class="table__item">
					<th class="table__text"><?=$id[$a]?> </th>
					<th class="table__text"><?=$name[$a]?></th>
					<th class="table__text"><?=$date[$a]?></th>
					<th class="table__text"><?=$time[$a]?></th>
					<th class="table__text"><?=$summa[$a]?> ₽</th>
				</tr>
				<?php endfor; ?>
			</tbody>
		</table>
	</div>
</body>
</html>
<?php mysql_close();?>