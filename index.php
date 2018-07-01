<?php
$db_host     = "localhost";
$db_username = "root";
$db_password = "";
$db_name     = "unced";
$db_charset  = "utf8";

$con    = mysql_connect($db_host, $db_username, $db_password);
$db     = mysql_select_db($db_name);
mysql_set_charset($db_charset);

if (!$con || !$db) {
  mysql_error();
}

$result = mysql_query("SELECT * FROM unced");

$i=0;
while ($row = mysql_fetch_array($result)) {
  $name[]       =$row['person'];
  $time[]       =$row['time'];
  $timestatus[] =$row['timestatus'];

  if (empty($name[$i])) {
    $name[$i] = "";
    $time[$i] = "";
    $timestatus[$i] = "";
  }

  $i++;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta   charset="UTF-8">
    <meta   name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta   http-equiv="X-UA-Compatible"
            content="ie=edge">

    <title>Underground</title>
    
    <link rel="stylesheet" href="css/header.min.css">
    <link rel="stylesheet" href="css/normalize.min.css">
    <link rel="stylesheet" href="css/main.min.css">
    <link rel="stylesheet" href="css/navigation.min.css">
    <link rel="stylesheet" href="css/table.min.css">
    <link rel="stylesheet" href="css/popup.min.css">
</head>
<body class="body">
	<!--Наимнование заведения-->
	<header class="header">
            <p class = "header_name">
                 UNDERGROUND
            </p>  
    </header>
    <!--Боковое меню-->
    <div class="nav" id="nav-js">
        <!--Пункты меню-->
        <a href="#1">
            <div class="nav-item nav-item_register">
                <div class="nav-item_text">Регистрация</div>
                <div class="nav-item_label"></div>
            </div>
        </a>
        <a href="#2">
            <div class="nav-item nav-item_product">
                <div class="nav-item_text">Товары</div>
                <div class="nav-item_label"></div>
            </div>
        </a> 
        <a href="#3"> 
            <div class="nav-item nav-item_prise">
                <div class="nav-item_text">Цена</div>
                <div class="nav-item_label"></div>
            </div>
        </a>

        <!--Бургер-->
        <div class="nav__burger">
            <div class="nav__burger_label"></div>
        </div>
    </div>
    <!--Popup окно-->
    <div class="add-visit _none js-add-visit">
    	<span class="_none" id="number_table"></span>
       	<header class="header_popup">
       	    <span class="close_popup js-close_popup"></span>
       	</header>
       	<div class="popup__enter_date">
       	    <label for="enter_name" class="popup__name">
       	        <p class="popup__name_text">Введите имя посетителя</p>
       	    </label>
       	    <div class="enter-name_size">
       	        <input type="text" id="enter_name" class="enter-name">
       	    </div>
       	</div>
       	<div class="popup__enter_date">
       	    <div class="popup__enter-time">
       	        <label for="enter-time" class="enter-time_message">
       	            <p class="enter-date_text">введите время</p>
       	        </label>
       	        <input type="number" id="enter_time" class="enter_add-time" min="1" max="10" value="1">
       	    </div>
       	    <div class="enter-date">
       	        <button type="submit" class="enter-date_click js-enter-date_click">
       	            <p class="enter-date_text js-enter-date_click">Подтвердить</p>
       	        </button>
       	    </div>
       	</div>
    </div>

    <!--Основа сайта-->
    <form action="" method="POST">
    <div class="content js-content">  
    	<!--Столы-->
        <?php  for ($a=0; $a<count($name);$a++):?>
        <!--Стол№<?=$a+1?>-->
    	<div class="table_pos">
        <?php if ($a % 2 == 0){ ?>
			<div class="table table-i table_left js-table" id="table_<?=$a+1?>">
        <?php } else{ ?>
            <div class="table table-i table_right js-table" id="table_<?=$a+1?>">
        <?php }; ?>
                <span class="js-prise_table _none" data-value="500"></span>
				<span class="js-house_table _none"><?=$timestatus[$a]?></span>
            <?php if (empty($name[$a])){ ?>
				<div class="table table_cap table_cap__number js-table_cap">
            <?php } else{ ?>
                <div class="table table_cap table_cap__number _none js-table_cap">
            <?php }; ?>
    				Стол №<?=$a+1?>
    			</div>
				<div class="table__number">
					<p class="table__number-i">Стол №<?=$a+1?></p>
				</div>
				<div class="table__info">
					<div class="table__info-i table__info_left">
						<div class="table__info_name">
							<p class="table__info_name-i">Клиент</p>
						</div>
						<div class="table__info_value">
							<span class="table__info_value-i js-table__info_name"><?=$name[$a]?></span>
						</div>
					</div>
					<div class="table__info-i table__info_right">
						<div class="table__info_name">
							<p class="table__info_name-i">Таймер</p>
						</div>
						<div class="table__info_value">
							<span class="table__info_value-i js-table__info_time" id="table-time_<?=$a+1?>"><?=$time[$a]?></span>
						</div>
					</div>
				</div>
				<div class="table__change">
					<div class="table__change-i table__change_extend">
						<div class="table__change_bth table__extend">
							<div class="table__change_text table_cap_extend table__change_back js-table__change_text">
								Продлить
							</div>
							<div class="table__extend_bth js-table__extend_bth">
								<div class="table__extend_item js-table__extend_item">
									<button type="submit" class="table__extend_item-bth js-table__extend_item" data-value="1">на 1 час</button>
								</div>
								<div class="table__extend_item js-table__extend_item">
									<button type="submit" class="table__extend_item-bth js-table__extend_item" data-value="2">на 2 часа</button>
								</div>
								<div class="table__extend_item js-table__extend_item">
									<button type="submit" class="table__extend_item-bth js-table__extend_item" data-value="3">на 3 часа</button>
								</div>
							</div>
						</div>
					</div>
					<div class="table__change-i table__change_remove">
                        <button type="submit" class="table__change_bth table__remove table__change_text js-table__remove">Убрать</button>
					</div>
				</div>
			</div>
		</div>

        <?php endfor; ?>
    </form>
	</div>	
    <!--Скрипты-->
    <script type="text/javascript" src="js/clock.min.js"></script>
    <script type="text/javascript" src="js/main.min.js"></script>
</body>
</html>
<?php mysql_close();?>