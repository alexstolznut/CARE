function initMap() {
  var map;
    $.get("/delphidata", function(data) {

        var locations = [];
        var pair = [];

        for (var i = 0; i < data.length; i++) {
            pair[1] = data[i].CITY;
            pair[2] = data[i].address + ", " + data[i].CITY;

            locations[i] = [pair[1], pair[2]];
        }

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(32.715738,-117.1610838),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();
        var geocoder = new google.maps.Geocoder();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
          geocodeAddress(locations[i]);
        }

        function geocodeAddress(location) {
          geocoder.geocode( { 'address': location[1]}, function(results, status) {
          //alert(status);
            if (status == google.maps.GeocoderStatus.OK) {

              //alert(results[0].geometry.location);
              map.setCenter(results[0].geometry.location);
              createMarker(results[0].geometry.location,location[0]+"<br>"+location[1]);
            }
            else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                console.log("over query limit")
            }
            else
            {
              alert("some problem in geocode" + status);
            }
          });
        }

        function createMarker(latlng,html){
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });

          google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent(html);
            infowindow.open(map, marker);
          });

          google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });
        }

    });

    var autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('location')), {
        types: ['geocode']
    });

    // load clinic data
    $.getJSON("/facilities.json", function (data) {
      // Iterate the groups first.
      var facilitydata = data.VAFacilityData;
      // console.log(fdata);
      // Iterate the groups first.
      createCircles(facilitydata);

    });

    function createCircles(facilities){
      var stationvalues = [];

      $.getJSON("/vamentalhealth.json", function (data) {
          // Iterate the groups first.
          var i = 0;
          $.each(data, function (index, value) {

              // Get all the categories
              var items = this.Item;
              if (items == "Proportion of Veterans with Confirmed Mental Illness Seen in Inpatient Mental Health") {
                  var lat;
                  var lon;
                  for (j = 0; j < facilities.length; j++){
                    if (facilities[j].facility_id == this.Station) {
                      lat = facilities[j].latitude;
                      lon = facilities[j].longitude;
                      break;
                    }
                  }

                  var station = this.Station;
                  var val = this.Value;
                  stationvalues[i] = [station,val, lat, lon];

              }
          });
          console.log(stationvalues);
          // circles(stationvalues);

      });
    }



}


//function initMap() {
//  var map = new google.maps.Map(document.getElementById('map'), {
//    center: {lat: 32.715738, lng: -117.1610838},
//    zoom: 9
//  });
//
//var autocomplete = new google.maps.places.Autocomplete(
//    /** @type {!HTMLInputElement} */
//    (document.getElementById('location')), {
//        types: ['geocode']
//    });
//}

//$('#clinic-form').submit(function(e) {
//    e.preventDefault();
//    var starting = $('#location').val();
//    // window.location.href = '/map?starting=' + starting;
//});