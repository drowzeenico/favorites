$('#loginButton').click(function() {
  $('#login').trigger('submit');
})

$('#login').on('submit', function(e) {
  e.preventDefault();
  var form = $('#login').ajaxSubmit({
    url: '/auth',
    method: 'post',
    dataType: 'json',
    beforeSubmit: function(arr) {
      $('#login input[name="login"]').parent().removeClass('has-error');
      $('#login input[name="password"]').parent().removeClass('has-error');
      $('#login #loginErrorMessage').hide();
    }
  });

  var xhr = form.data('jqxhr');

  xhr
  .done(data => {
    window.location.href = '/profile';
  })
  .fail(err => {
    if(err.responseJSON.fields != null)
      err.responseJSON.fields.map(f => {
        $('#login input[name="'+f+'"]').parent().addClass('has-error');
      });

    $('#login #loginErrorMessage').text(err.responseJSON.message).show();
  });
});