<?php

/*************************************************************************
	INCLUDES		
**************************************************************************/	

require_once "func.inc.php";   	// includes common functions for use in apps

/*************************************************************************
	CONSTRUCT TEMPLATE CLASS		
**************************************************************************/	
	
class buildTemplate{

	public $css;
	public $jsIE;
	public $js;    

	public function __construct(){			
	
		$this->css = array();
		$this->css[]="/assets/bower_components/bootstrap/dist/css/bootstrap.min.css";
		$this->css[]="/assets/bower_components/metisMenu/dist/metisMenu.min.css";
		$this->css[]="/assets/dist/css/timeline.css";
		$this->css[]="/assets/dist/css/sb-admin-2.css";		
		$this->css[]="/assets/bower_components/font-awesome-4.7.0/css/font-awesome.min.css";
		$this->css[]="/assets/css/bioinf.css";			
				
		$this->jsIE = array();
		$this->jsIE[]="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js";
		$this->jsIE[]="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js";
		
		$this->js = array();
		$this->js[]="/assets/bower_components/jquery/dist/jquery.min.js";
		$this->js[]="/assets/bower_components/bootstrap/dist/js/bootstrap.min.js";
		$this->js[]="/assets/bower_components/metisMenu/dist/metisMenu.min.js";
		$this->js[]="/assets/dist/js/sb-admin-2.js";
		$this->js[]="/assets/js/noty/packaged/jquery.noty.packaged.min.js";		
		$this->js[]="/assets/js/func.lib.js";		
		
	}

	public function addCSS($fl){	
		$this->css[]=$fl;		
	}
	
	public function addJS($fl){
		$this->js[]=$fl;
	}
	
	public function addJSIE($fl){
		$this->jsIE[]=$fl;
	}
	
	public function addDataTables(){
		$this->js[]="/assets/js/detail.js";
		$this->js[]="/assets/bower_components/datatables/media/js/jquery.dataTables.min.js";
		$this->js[]="/assets/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js";		
		$this->css[]="/assets/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css";
		$this->css[]="/assets/bower_components/datatables-responsive/css/dataTables.responsive.css";
		$this->js[]="/assets/js/dt.js";
	}
	
	public function addCharts(){
		$this->css[]="/assets/bower_components/morrisjs/morris.css";
		$this->js[]="/assets/bower_components/raphael/raphael-min.js";
		$this->js[]="/assets/bower_components/morrisjs/morris.min.js";
	}
	
	public function addFlotCharts(){
		$this->js[]="/assets/bower_components/flot/excanvas.min.js";
		$this->js[]="/assets/bower_components/flot/jquery.flot.js";
		$this->js[]="/assets/bower_components/flot/jquery.flot.pie.js";
		$this->js[]="/assets/bower_components/flot/jquery.flot.resize.js";
		$this->js[]="/assets/bower_components/flot/jquery.flot.time.js";	
		$this->js[]="/assets/bower_components/flot/jquery.flot.stack.js";	
		$this->js[]="/assets/bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js";
	}
	
	public function addD3(){
		$this->js[]="/assets/js/d3/d3.min.js";
		$this->js[]="/assets/js/d3/d3-scale.min.js";
	}
	
	public function addTabs(){
		$this->js[]="/assets/js/tabs.js";
	}
	
	public function addAccordion(){
		$this->js[]="/assets/js/accordion.js";
	}
	
	public function addForm(){
		$this->js[]="/assets/js/jquery.multiple.select.js";
		$this->css[]="/assets/css/multiple-select.css";
		$this->js[]="/assets/js/plugins/moment/moment.min.js";
		$this->js[]="/assets/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js";
		$this->js[]="/assets/js/SimpleAjaxUploader.min.js";
		$this->css[]="/assets/css/plugins/bootstrap-datetimepicker.min.css";
	}
	
	public function addAuth(){
	
		include_once "auth/Config.php";
		include_once "auth/Auth.php";	
	}
	
	public function addAll(){
		$this->addDataTables();
		$this->addTabs();
		$this->addAccordion();
		$this->addForm();
		$this->addCharts();
	}
	
	public function cssOut(){		
		foreach($this->css as $fl){		
		   echo '<link href="'.$fl.'" rel="stylesheet">'."\n";
		}
	}
	
	public function jsIEOut(){
		if(count($this->jsIE)>0){
			echo  '<!--[if lt IE 9]>'."\n";
			foreach($this->jsIE as $fl){
				echo '<script src="'.$fl.'"></script>'."\n";
			}
			echo '<![endif]-->'."\n";
		}
	}
	
	public function jsOut(){
		foreach($this->js as $fl){
			echo '<script src="'.$fl.'"></script>'."\n";
		}
	}
	
	public function execute(){
		include_once TEMPLATE . "body.inc.php";
	}
}
?>