<?php
	
	header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
	
	/***************************************************************
		run the SQL and return an array explaining the results for parsing
		* $dbc is the mysqlii object 
		* $dbc->dbconn is the connection
		* $sql is the sql string to be executed
		
		* runSQL is intended as single inserts or multi-updates
		  and returning success, error if applicable, number of rows
		  affected and the last insert id if applicable
		  
		* funDatatable runs a select sql string and returns
		  and array that will be returned as a json object in the format
		  {"columns": ["col1name","col2name",...], "data:[["row1"][row2"]]}
	****************************************************************/
		
	require_once "func.inc.php";  	//  includes common functions for use in apps	
	
	function checkRequest($b = true){
	
		if($b === false){
			$arData=array("success"=>false,"msg"=>"Error: User has been logged out");
			echo json_encode($arData);
			exit();		
		}
	
		if(!isset($_REQUEST['call_id'])){
			$arData=array('success'=>false,"msg"=>"Error: there was no post identifier");
			echo json_encode($arData);
			exit();
		}
		
		return $_REQUEST['call_id'];
	}
		
	function runSQL($dbc,$sql){

		$arData=array();
		$arData['qType']=substr($sql,0,3);
		$qry = $dbc->prepare($sql);
		
		if(!$qry){
			$arData['success']=false;
			$arData['error']=$qry->errorInfo().' SQL: '.$sql;
			emailError($qry->errorInfo().' SQL: '.$sql);  // emailError() function in func.inc.php file and sends email with info to bioinf
		}
		else{
		
			$qry->execute();
			
			$arData['success']=true;
			$arData['error']="none";	
			$arData['rows']=$qry->rowCount();
			if($arData['qType']=="ins"){
				$arData['rid'] = $dbc->lastInsertId();
			}
			else if(strtolower($arData['qType'])=="sel"){
				while($row = $qry->fetch(PDO::FETCH_ASSOC)){
					$arData['data'][]=$row;
				}
			}
		}
			
		$qry->closeCursor();		
		return $arData;
	}
	
	function runDatatable($dbc,$sql){
	
		$arData=array();	
		$arCols=array();
		
		$qry = $dbc->prepare($sql);
		
		if(!$qry){
			$arData['success']=false;
			$arData['error']=$qry->errorInfo().' SQL: '.$sql;
			emailError($qry->errorInfo().' SQL: '.$sql);  // emailError() function in func.inc.php file and sends email with info to bioinf
		}
		else{
		
			$qry->execute();
			$row_cnt = $qry->rowCount();		
			for ($i = 0; $i < $qry->columnCount(); $i++) {
				$col = $qry->getColumnMeta($i);
				$arCols[]['title']=str_replace("_", " ",$col['name']);
			}			
			$arData['columns']=$arCols;
			while($row = $qry->fetch(PDO::FETCH_ASSOC)){
				$arData['data'][]=array_values($row);
			}
		}
		
		$qry->closeCursor();	
		return $arData;	
	}
	
	function runReport($dbc,$sql){
		
		$arData=array();	
		$arCols=array();
		$qry = $dbc->prepare($sql);
		
		if(!$qry){
			$arData['success']=false;
			$arData['error']=$qry->errorInfo().' SQL: '.$sql;
			emailError($qry->errorInfo().' SQL: '.$sql);  // emailError() function in func.inc.php file and sends email with info to bioinf
		}
		else{
		
			$qry->execute();
			$arData['success']=true;
			$arData['error']="none";	
			$arData['count']=$qry->rowCount();
			
			for ($i = 0; $i < $qry->columnCount(); $i++) {
				$col = $qry->getColumnMeta($i);
				$arCols[]['title']=str_replace("_", " ",$col['name']);
			}			
			$arData['columns']=$arCols;			
			while($row = $qry->fetch(PDO::FETCH_ASSOC)){
				$arData['chart'][]=$row;
				$arData['data'][]=array_values($row);
			}
		}

		$qry->closeCursor();	
		return $arData;	
	
	}
	
?>