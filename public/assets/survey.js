$('.yes').click(function() {
    if ($(this).is(':checked')) {
        $('#blah, .blah').css("visibility", "visible");
    }
});

$('.no').click(function() {
    if ($(this).is(':checked')) {
        $('#blah, .blah').css("visibility", "hidden");
    }
});
