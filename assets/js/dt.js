 /*
 
	call all options
	
	$(SELECTOR).showDataTable({
		dtID: "id for the datatable", (required)
		ajaxURL: "url for ajax call", (required)
		params: { call_id: "call identifier for ajax page", arg2: "", arg3: "",... } (required - paramaters passed in post,
		cols: [ download, open, view, edit,	del ],  (columns to add at the end)
		hide: 1,  (number of columns at the start of the table to hide)
		clear: true|false	(optional true will recreate dt if it exists, false will exit if it exists)
	})
*/

function columnDefs(ar){

	var cols = [];
	var i = -1;

	if(ar.length){
	
		$.each(ar, function(k,v){
			
			switch(v){
				
				case "del":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-trash" title="delete"></i>'	
						});
					i--;
					break;
					
				case "edit":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-edit" title="edit"></i>'	
						});				
					i--;
					break;	
					
				case "view":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-file-text-o" title="view"></i>'	
						});				
					i--;
					break;
					
				case "open":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-folder-open" title="open"></i>'	
						});				
					i--;
					break;
					
				case "download":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-download" title="download"></i>'	
						});				
					i--;
					break;
					
				case "toggle":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-toggle-on fa-toggle-off" title="active - click to hide"></i>'	
						});				
					i--;
					break;
					
				case "info":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-info-circle" title="more info"></i>'	
						});				
					i--;
					break;
					
					
				case "add":
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-plus" title="add"></i>'	
						});				
					i--;
					break;
					
				default:
					cols.push({
							targets: [i],
							data: null,
							visible: true,
							searchable: false,
							sortable: false,
							width: "15px",
							defaultContent: '<i class="dt-nav text-muted fa fa-' + v + '" title="' + v + '"></i>'	
						});				
					i--;
					break;
				
			
			}
		});
	}

	return cols;
}

$.fn.showDataTable = function(){

	var parID = this.selector;
	var obj = arguments[0];				
	var cols = columnDefs(obj.cols);	
	var table;
	var dtID = "#" + obj.dtID;
	var i = 0;
	if(!obj.hasOwnProperty('clear')){ obj.clear = true; }
	if(!obj.hasOwnProperty('console')){ obj.console = false; }
		
	if(!$(dtID).length){
		$(parID).append($('<div>').addClass("panel panel-default")
			.append($('<div>').addClass("panel-body")
				.append($('<div>').addClass("dataTable_wrapper")
					.append($('<table>').attr({id:obj.dtID, role:"grid"}).addClass("display table table-striped table-bordered table-hover dataTable no-footer")))));
	}
	else if(obj.clear == false){
		var table = $(dtID).dataTable();											
		setTimeout( function(){ 
			$(dtID).css( {"width":"99%","th white-space":"nowrap" }); 
			table.fnAdjustColumnSizing(); },250 );
		return false;
	}
	else if ( $.fn.dataTable.isDataTable( dtID )) {
		$(dtID).DataTable().destroy();
		$(dtID).empty();
	}
	
	for(i=0;i<obj.hide;i++){
		cols.push({targets:[i], visible: false, searchable: true });
	}
	
	$.ajax({
		type: "POST",
	    url: obj.ajaxURL,
		data: obj.params,
		cache: false,
		dataType: "json",
		success: function(json){	
			if(obj.console == true) { console.log('SUCCESS: ' + JSON.stringify(json)); }		
			if(obj.hasOwnProperty('vdata')) { window[obj.vdata] = json; }
			for( i=0; i<obj.cols.length; i++) { json.columns.push( {title: "&nbsp;"} ); };
			table = $(dtID).DataTable({
				"columns": json.columns,
				"data": json.data,
				"scrollY":  500,
				"scrollCollapse": true,
				"scrollX": true,
				"paging": false,	
				"aaSorting": [],
				"autoWidth": true,
				"deferRender": true,
				"scroller": true,
				"columnDefs": cols,
                                "deferRender": true,
				"fnInitComplete": function () {
					var table = $(dtID).dataTable();											
					setTimeout( function(){ 
						$(dtID).css( {"width":"99%","th white-space":"nowrap" }); 
						table.fnAdjustColumnSizing(); },180 );
					runAfterInit(dtID);
				},
			});
		},
		error: function (jqXHR, textStatus, errorThrown) {
			if(obj.console == true) { console.log('FAIL: ' + JSON.stringify(jqXHR)); }
			if (jqXHR.status == 500) {				   
				alert('Internal error: ' + jqXHR.responseText);
			} else {
				alert('Unexpected error. ' + jqXHR.responseText);
			}
		}
	});	
}

$(function() {		

	$(document).on( 'click', '.dt-nav', function () {
	
		var objTbl = {};
		
		objTbl.tblID = $(this).closest('table').attr('id');	
		objTbl.action = $(this).attr('data-original-title');
		objTbl.row = $('#' + objTbl.tblID).DataTable().row( $(this).parents('tr') );
		objTbl.data = objTbl.row.data();		
		
		openAction(objTbl);
	
	});	

	$('body').tooltip({
		selector: '.dt-nav',
		show: true,
        placement: 'top' 
	});		

});
