var form = $('#registration').ajaxSubmit({
  url: '/users',
  method: 'post',
  dataType: 'json'
});

var xhr = form.data('jqxhr');

xhr
.done(data => {
  alert(data)
})
.fail(err => {
  alert(err)
});