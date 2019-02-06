$('#registrationButton').click(function() {
  if(!$('#agree').is(':checked')) {
    $('#registration #registrationErrorMessage').text('Are you agree with terms?');
    $('#registration #registrationErrorMessage').show();
    return false;
  } else
    $('#registration').trigger('submit');
})

$('#registration').on('submit', function(e) {
  e.preventDefault();
  var form = $('#registration').ajaxSubmit({
    url: '/users',
    method: 'post',
    dataType: 'json',
    beforeSubmit: function(arr) {
      ['firstName', 'lastName', 'email', 'password', 'repeatPassword'].map(f => {
        $('#registration input[name="'+f+'"]').parent().removeClass('has-error');
      });
      
      $('#registration #registrationErrorMessage').hide();
    }
  });

  var xhr = form.data('jqxhr');

  xhr
  .done(data => {
    $('#registration').trigger("reset");
    $('#registration #registrationErrorMessage').removeClass('text-danger');
    $('#registration #registrationErrorMessage').addClass('text-success');
    $('#registration #registrationErrorMessage').text('Registration successfully completed. Now try to login with your credentials.');
    $('#registration #registrationErrorMessage').show();
  })
  .fail(err => {
    if(err.responseJSON.fields != null)
      err.responseJSON.fields.map(f => {
        $('#registration input[name="'+f+'"]').parent().addClass('has-error');
      });

    $('#registration #registrationErrorMessage').text(err.responseJSON.message).show();
  });
});