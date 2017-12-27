<?php

//**************************************************************
//	Custom Class Autoloader
//**************************************************************

spl_autoload_register(function ($classname) {
	
	if($classname != "PDO"){
		$fn[] = dirname(__FILE__).DIRECTORY_SEPARATOR.'class/' . str_replace('\\', DIRECTORY_SEPARATOR, $classname) . '.class.php';
		$fn[] = dirname(__FILE__).DIRECTORY_SEPARATOR.'class/' . str_replace('\\', DIRECTORY_SEPARATOR, $classname) . '.php';
		
		foreach($fn as $filename){

			if(is_readable($filename)){
				require_once $filename;
				break;
			}	
		}	
	}
  
});

//**************************************************************
//	Establish DB connection
// 	DB is defined in site/[APP]/configuration.inc.php file
//**************************************************************

$dbc = new myPDO(DB);
$dbc->setAttribute(PDO::ATTR_EMULATE_PREPARES,false); 


?>