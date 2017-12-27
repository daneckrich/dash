/* ************************************************************

	loadAccordion configures the html to fit the bootstrap accordion format
	
	to call
	
	$(SELECTOR).loadAccordion({
		type: "html|json",
		data: json string (only for type json)
	});

	HTML FORMAT
	
	<div id="SELECTOR">
		<div class="accordion_content">
			<div class="accordion_row">
				<div class="accordion_header">HEADER HERE</div>
				<div class="accordion_body">BODY HERE</div>
			</div>
		</div>
	</div>
	
	JSON FORMAT

**************************************************************** */

$.fn.loadAccordion = function(){
	
	var divID = this.selector;
	var accID = divID.replace("#","") + "_accordion";
	var args = arguments[0];
	var data = [];
	
	if(args.type == "html"){
		$(divID + ' .accordion_content').children().each(function(){
			data.push({ "header": $(this).children('.accordion_header').html(), "body": $(this).children('.accordion_body').html(), "cls": $(this).children('.accordion_body').attr('data-class') });	
		});
		$(divID + ' .accordion_content').empty();
	}
	else{
		data = args.data;
	}

	$(divID).append($('<div>').attr('id',accID).addClass('panel-group'));
	$.each(data, function(k,v){
		$('#' + accID).append($('<div>').addClass('panel panel-default')
			.append($('<div>').addClass('panel-heading')
				.append($('<a>').attr( {'data-toggle':'collapse', 'href':'#sec' + accID + k })
					.append($('<h4>').addClass('panel-title').html(v.header))))
			.append($('<div>').attr('id','sec' + accID + k).addClass('panel-collapse collapse ' + v.cls)
				.append($('<div>').addClass('panel-body').html(v.body))));
	});

}