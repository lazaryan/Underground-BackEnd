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

$result = mysql_query("SELECT * FROM unced");

$i=0;
while ($row = mysql_fetch_array($result))
{
  $name[]=$row['person'];
  $time[]=$row['time'];
  $timestatus[]=$row['timestatus'];
  $prise[]=$row['prise'];
  $id[]=$row['id'];
  if (empty($name[$i])) {
    $name[$i] = "";
    $time[$i] = "00:00:00";
    $timestatus[$i] = "0";
  }
  $i++;
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

    <title>Underground</title>
    
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/table.css">
    <noscript id="deferred-styles">
        <link rel="stylesheet" type="text/css" href="css/popup.css">
        <link rel="stylesheet" type="text/css" href="css/popup_prise.css">
    </noscript>
</head>
<body class="body">
    <!--Основа сайта-->
    <div class="content" id="content">
        <header class="header">
            <a href="./report.html" target="_blank" class="header__link">Отчет</a>
        </header>
    </div>	
    <!--Скрипты-->
    <script src="js/create_object.js"></script>
    <script src="js/apend_styles.js"></script>
    <script src="js/add_client.js"></script>
    <script src="js/clock.js"></script>
    <script src="js/pay.js"></script>
    <script src="js/table.js"></script>
    <script src="js/controller.js"></script>
    <script>
        let content = document.querySelector('#content');

        let tabels = [ 
            <?php  for ($a=0; $a<count($name);$a++):?>
                {
                    prise: <?=$prise[$a]?>,
                    name:"<?=$name[$a]?>",
                    hours:<?=$timestatus[$a]?>,
                    order:"<?=$time[$a]?>"
                }<?php if ($a<(count($name)-1)) echo ','; ?>
            <?php endfor; ?>
        ];

		let data = {
			content: content,
			tabels: tabels
		}

        let controller = new Controller(data);
    </script>
</body>
</html>
<?php mysql_close();?>