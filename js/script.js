$(document).ready(function() {
	var timeDelay = 300;
	setTimeout($.post, timeDelay)
	$( "#input" ).keyup(function() {
        var filedata = {
            input: $("#input").val()
        }
        $.post( "/searchbar", filedata, function( data ) {
});
});
});