$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('selectFile', label);
});

$(document).ready(function() {
    $('.btn-file :file').on('selectFile', function(event, label) {

        var input = $(this).parents('.input-group').find(':text');

        if( input.length ) {
            input.val(label);
        }
    });
});