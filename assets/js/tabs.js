var int_delay = 300;
$(function() {			

	// *************************************
	// loadTab(i) is a custom function
	// on the config.js file
	// *************************************	
		
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var i = $(e.target).parent().index();
		loadTab(i);
		$(e.target).scrollTop(0);	
	})

	// *************************************
	// DISPLAY VALUE OF TITLE ATTRIBUTE
	// WHEN HOVERING OVER JQUERY UI ICONS
	// *************************************	
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})

	// *************************************
	// SET DELAY TO DISPLAY PAGE 
	// FOR BETTER FORMATTING ON AJAX CALLS
	// THAT MAY BE SLOW
	// int_delay set on config page
	// *************************************		
	setTimeout(function() {
		$('#tabs_page').css({ opacity: 1 });		
		$( "body" ).scrollTop( 0 );				
	}, int_delay);
});
