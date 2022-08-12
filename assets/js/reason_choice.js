$l = $('.left')
$r = $('.right')

$l.mouseenter(function() {
  $('.reason-benefit').addClass('left-is-hovered');
}).mouseleave(function() {
  $('.reason-benefit').removeClass('left-is-hovered');
});

$r.mouseenter(function() {
  $('.reason-benefit').addClass('right-is-hovered');
}).mouseleave(function() {
  $('.reason-benefit').removeClass('right-is-hovered');
});