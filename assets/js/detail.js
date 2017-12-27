function detailTable(obj,json){

	$(obj.parID).append($('<div>').attr("id",obj.unq+"rec_header").addClass("row")
			.append($('<div>').attr("id",obj.unq+"rec_actions").addClass("col-lg-12 text-right rec_actions")));
			
	$.each(obj.actions, function(k,v){
		$('#' + obj.unq + 'rec_actions').append($('<button>').attr( { "id":obj.unq+"rec_"+v, "title":v }).attr("type","button").addClass('btn btn-primary rec-action')
			.append($('<i>').addClass('fa fa-' + v)));
	});
	
	$(obj.parID).append($('<div>').attr('id',obj.prefix + '_rec_detail').addClass('row')
			.append($('<div>').addClass("col-lg-12")
				.append($('<div>').addClass('panel panel-default')
					.append($('<div>').addClass('panel-body')
						.append($('<h3>').attr('id',obj.prefix + '_detail_header').text(obj.header))
							.append($('<div>').addClass('table-responsive')
								.append($('<table>').attr('id',obj.prefix + '_rec_table').addClass('table table-bordered table-striped rec_table')))))));
	
	
	$.each(json, function(key,val){
		$.each(val, function(k,v){
			if(v == 'hold-spinner'){
				v = '<span id="' + k + '"><i class="fa fa-refresh fa-spin"></i></span>';
			}
			$('#' + obj.prefix + '_rec_table').append($('<tr>')
				.append($('<td>').attr('id',obj.unq + k).addClass('dtl_col_1').html(k.replace(/_/g,' ')))
				.append($('<td>').addClass('dtl_col_2').html(v)));
		});
	});

}

function redcapTable(obj,json){
	
	$(obj.parID).append($('<div>').attr("id",obj.unq + "rec_header").addClass("row")
			.append($('<div>').attr("id",obj.unq + "rec_actions").addClass("col-lg-12 text-right rec_actions")));
			
	$.each(obj.actions, function(k,v){
		$('#' + obj.unq + 'rec_actions').append($('<button>').attr( { "id":obj.unq + "rec_"+v, "title":v }).attr("type","button").addClass('btn btn-primary rec-action')
			.append($('<i>').addClass('fa fa-' + v)));
	});
	
	$(obj.parID).append($('<div>').attr('id',obj.prefix + '_rec_detail').addClass('row')
		.append($('<div>').addClass("col-lg-12")
			.append($('<div>').addClass('panel panel-default')
				.append($('<div>').addClass('panel-body')
					.append($('<h3>').attr('id',obj.prefix + '_detail_header').text(obj.header))
						.append($('<div>').addClass('table-responsive')
							.append($('<table>').attr('id',obj.prefix + '_rec_table').addClass('table table-bordered table-striped rec_table'))))))
		.append($('<form>').attr({id: obj.unq + 'redcap_form', action: obj.URL, method:'POST', target:'_blank'})));
								
	$.each(json.data, function(k,v){
		if(v.display_value !== ""){
			$('#' + obj.prefix + '_rec_table').append($('<tr>')
				.append($('<td>').html(v.display_label))
				.append($('<td>').html(v.display_value)));
		}
		$('#' + obj.unq + 'redcap_form').append($('<input>').attr({type:'hidden',name:v.field_name,value:v.field_value}));	
	});
	
	$('#' + obj.unq + 'redcap_form').append($('<textarea>').attr({id:obj.unq + 'redcap_raw', name:'redcap_raw'}).html(JSON.stringify(json.data)).hide());
}

$.fn.runDetailTable = function(){

	var parID = this.selector;
	var unq = '';
	var obj = arguments[0];
	
	if(obj.hasOwnProperty('idprefix')) { unq = obj.idprefix + '_'; }
	obj.parID = parID;
	obj.prefix = parID.replace('#','');
	obj.unq = unq;

	$(parID).append($('<div>').attr("id",obj.unq+"rec_admin").append($('<form>').attr("id",obj.unq+"detail_admin_form")));			
	$.each(obj.data, function(k,v){
		$('#' + obj.unq + 'detail_admin_form').append($('<input>').attr({"type":"hidden","id":obj.unq+"rec_adm_"+k,"value":v, "name":"rec_adm_"+k }).addClass("admin_form"));
	});

	ajaxPOST(obj.URL,obj.params).done(function(json){
		if(obj.console == true) { console.log(JSON.stringify(json)); }
		if(json.success == true){
			if(obj.hasOwnProperty('redcap') && obj['redcap'] === true){ redcapTable(obj,json);	}
			else{ detailTable(obj,json.data); }
		}
		else{
			createAlert("error",json.msg);
		}
	})
	.fail(function(jqXHR, textStatus) {
		console.log(textStatus + ': ' + JSON.stringify(jqXHR));
	});
}

