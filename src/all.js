import $ from 'jquery'
$(document).ready(function () {
  $('.scrollTop').click(function (e) {
    $('html,body').animate({
      scrollTop: 0
    }, 1000)
  })
  $(window).scroll(function (e) {
    if ($(this).scrollTop() > 400) {
      $('.scrollTop').fadeIn()
    } else {
      $('.scrollTop').fadeOut()
    }
  })
})
