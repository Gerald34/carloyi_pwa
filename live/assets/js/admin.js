$(function() {

  //const itemColumn = jQuery('.idPicker');
  const sendOffer = jQuery('.idPicker1');
  //const offer = jQuery('.idPicker').attr('id');

  sendOffer.on('click', function() {
    const offer = jQuery(this).attr('id');
    localStorage.setItem('activeOffer', offer);
    // window.location.replace('/offers');
  });

  const makeOffer = $('#makeOffer');

  makeOffer.on('click', function() {
    const offerData = {
      request_id: localStorage.getItem('activeOffer'),
      offer: $('#offer').val(),
      comment: $('#comments').val()
    };

    $.post(adminAPI + '/portal/placeoffer',offerData, function(data) {
      if (data.code === 1) {
        $('.loginForm').hide().addClass('animated fadeOut');
        setTimeout(function() {
          swal('Great!!', 'Offer successfully sent', 'success');
          setTimeout(function() {

            window.location.replace('/dashboard');
          }, 3000);
        }, 1000);

      } else {
        swal('Oops!', data.error, 'warning');
      }
    });
  });

});
