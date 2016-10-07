$(document).ready(function() {
  currentWidth = $('.panel-cover').width();
  console.log("rendering at " + currentWidth);
  $('body').removeClass('no-js');

  if (currentWidth < 400) {
    $('#sidebar-nav').hide();
    $($('.content-wrapper__inner')[0]).css('padding-top', '0px')
    console.log("side-nav should be hidden");
  }

  $('a.blog-button').click(function() {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;

    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed');
      $('.content-wrapper').addClass('animated slideInRight');
    } else {
      $('.panel-cover').css('max-width',currentWidth);
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function() {} );
    }
  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  var l = window.location.pathname.length;
  if (window.location.hash && window.location.hash == "#night") {
    $('head').append('<link rel="stylesheet" href="/css/night.css" type="text/css" />');
    //convert links to night mode
    var links = $('.navigation a');
    for (var i = 0; i < links.length; i++) {
     var li = $('a')[i];
     var href = li.getAttribute("href");
     $(li).attr("href", href + '#night');
     console.log("set link to " + li.getAttribute("href"));
   }
    $($('.navigation')[0])
      .append('<li class="navigation__item"><a href="' + window.location.pathname.substring(0, l - 1) + '/" title="link to {{ .Site.Title }} blog" class="blog-button">Day Mode</a> </li></br>');
  } else {
    $($('.navigation')[0])
      .append('<li class="navigation__item" id="nightButton"><a href="' + window.location.pathname.substring(0, l - 1) + '/#night" title="link to {{ .Site.Title }} blog" class="blog-button">Night Mode</a> </li></br>');    
    $('#nightButton').on("click", function() {
      $('head').append('<link rel="stylesheet" href="/css/night.css" type="text/css" />');
      $('#nightButton').remove();
        $($('.navigation')[0]).append('<li class="navigation__item"><a href="' + window.location.pathname.substring(0, l - 1) + '/" title="link to {{ .Site.Title }} blog" class="blog-button">Day Mode</a> </li></br>');
    });
    //convert links to night mode
    var links = $('.navigation a');
    for (var i = 0; i < links.length; i++) {
     var li = $('a')[i];
     var href = li.getAttribute("href");
     $(li).attr("href", href + '#night');
     console.log("set link to " + li.getAttribute("href"));
   }
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu').click(function() {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    $('.btn-mobile-menu__icon').toggleClass('hidden');
    $('.btn-mobile-close__icon').toggleClass('hidden');
  });

  $('.navigation-wrapper .blog-button').click(function() {
    $('.navigation-wrapper').toggleClass('visible');
    $('.btn-mobile-menu__icon').toggleClass('hidden');
    $('.btn-mobile-close__icon').toggleClass('hidden');
  });
});

//https://css-tricks.com/fluid-width-youtube-videos/
$(function() {

  // Find all YouTube videos
  var $allVideos = $("iframe[src^='http://www.youtube.com']"),

      // The element that is fluid width
      $fluidEl = $("body");

  // Figure out and save aspect ratio for each video
  $allVideos.each(function() {

    $(this)
      .data('aspectRatio', this.height / this.width)
      
      // and remove the hard coded width/height
      .removeAttr('height')
      .removeAttr('width');

  });

  // When the window is resized
  // (You'll probably want to debounce this)
  $(window).resize(function() {

    var newWidth = $fluidEl.width();
    
    // Resize all videos according to their own aspect ratio
    $allVideos.each(function() {

      var $el = $(this);
      $el
        .width(newWidth)
        .height(newWidth * $el.data('aspectRatio'));

    });

  // Kick off one resize to fix all videos on page load
  }).resize();

});
