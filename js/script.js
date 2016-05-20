$(document).ready(function() {
	$( "#input" ).keyup(function() {
        var filedata = {
            input: $("#input").val()
        }
        $.post( "/searchbar", filedata, function( data ) {
});
});
});