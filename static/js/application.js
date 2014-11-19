/*
 * Help - for each panel heading and each of the controls
 */
$("div.panel-heading").click(function(){showHelp(this)});
$("input[type='text'], textarea, select").on("focus", function(){showHelp(this)});

/*
 * Hide all the help text then show the one you want.  Knockout.js has been 
 * used to add an index to some of the ids so that Selenium can identify them
 * so the id has to be removed (split on -).
 */
function showHelp(element){
	$('.help-panel').show(); // hide the panel containing the help text
	$('.help-text').hide(); // hide all the help text
	var helpTextElements = $('#' + element.id.split("-",1)[0] + '-help'); // find the help text for the control
	helpTextElements.show(); // and show it.
	if (0 == helpTextElements.length) // if there are no help text elements 
	{
		$('.help-panel').hide(); // hide the help panel
	}
} 

/*
 * Scroll the help box, so it is visible when the accordian is expanded.
 */
$(window).scroll(function(){			
	$("#help").stop().animate({"marginTop": ($(window).scrollTop()) + "px"}, "slow" );			
});

/*
 * Toggle the document view
 */
$("#toggleDocument").click(function(event) {
	var link = $(this);
	link.text() == link.data("document") ? link.text(link.data("form")) : link.text(link.data("document"));
	$("#form").toggle();
	$("#help").toggle();
	$("#foot").toggle();
	$("#document").toggle();
});
