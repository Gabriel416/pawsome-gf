$(document).ready(function() {
  window.sr = ScrollReveal({ reset: true });
  window.sr = ScrollReveal({ duration: 3000 });
sr.reveal('.animate1', 50);
sr.reveal('.animate2', 100);
sr.reveal('.animate3', 200);
sr.reveal('.get-started-button', 120);
});

$(".slide").click(function() {
    $('html,body').animate({
        scrollTop: $(".project").offset().top},
        1200);
});


if ($(window).width() < 1050) {
   $("#get-rid-dog").remove();
   $(".project").addClass("text-center");
   $(".left").css("width", "100%").css("background", "url('../../../media/Snapshots/brown-dog-md.png') no-repeat;")
   // document.createElement("img")
}
