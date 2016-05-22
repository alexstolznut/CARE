function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.715738, lng: -117.1610838},
    zoom: 9
  });

var autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('location')), {
        types: ['geocode']
    });
}

$('#clinic-form').submit(function(e) {
    e.preventDefault();
    var starting = $('#location').val();
    // window.location.href = '/map?starting=' + starting;
});