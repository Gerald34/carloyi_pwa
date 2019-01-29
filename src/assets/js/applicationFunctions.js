
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

$(window).on('load', function() {
  $('#cover').fadeOut(2000);
});

// All functions for the home page
/*
  All Application functions
 */
$(function() {
  var lastItems = $("li .nav-item a");
  lastItems.slice(lastItems.length - 2).addClass("boldText");
  // $('.slider-header').animateCss('zoomIn');

  const URL = window.location.pathname;
  hideElement('loader');

  function hideElement(id, speed) {
    $('#'+ id).hide(speed);
  }

  function showElement(id, speed) {
    $('#' + id).show(speed).addClass('animated fadeIn');
  }

  // Search car by make and model
  showElement('option-a');
  hideElement('option-a-form');
  //$('#option-a-form ').hide();

  $('#option-1').on('click', function() {
    $('#option-a').hide();

    setTimeout(function() {
      $('#option-a-form ').show().addClass('animated fadeIn');
    },200);

    $('#cancel-a').on('click', function() {
      $('#option-a').show().addClass('animated fadeIn');
      $('#option-a-form ').hide();
    });

  });

  // Search car by make and model
  $('#option-b').show();
  $('#option-b-form ').hide();

  $('#option-2').on('click', function() {
    $('#option-b').hide();
    $('#option-b-form ').show();

    $('#cancel-b').on('click', function() {
      $('#option-b').show();
      $('#option-b-form ').hide();
    });
  });

  $('#theRegistrationForm').hide();
  $('#theForm').show();

  $('#register').on('click', function() {

    $('#theRegistrationForm').show();
    $('#theForm').hide();
    $('#theHead').text('Please register for you new account');
    $('#thequestion').html('Existing user? <b><a id="signin">Sign In</a></b>.');

    $('#signin').on('click', function() {

      $('#theRegistrationForm').hide();
      $('#theForm').show();
      $('#theHead').text('Log into your account and buy a car.');
      $('#thequestion').html('Are you an existing user? If not <b><a id="register">Register Here.</a></b>');

    });

  });

});
