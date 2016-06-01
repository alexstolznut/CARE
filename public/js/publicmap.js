var county = [];
var gmarkers = [];

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(32.715738,-117.1610838),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var c = [];


    $.getJSON("/county.json", function (data) {

        var i = 0;

        $.each(data, function (index, value) {
//            console.log(data[i].state + "  " + data[i].county + " county");
            i++;
        });
    });

    var county = [];
    var enrollees = [];
    var counties = [];
    var i = 0;

    $.getJSON("/veteranenrollees.json", function (data) {

        var databycounty = data.DataByCounty;
//        console.log(databycounty);
        // Iterate the groups first.
        $.each(databycounty, function (index, value) {

//            console.log(databycounty[i].CountyName + "  " + databycounty[i].VeteranEnrollees);
//            // Get all the categories
//            var StateAbbrev = databycounty[i].StateAbbrev;
//
//            counties[i] = databycounty[i].CountyName;
//            enrollees[i] = databycounty[i].VeteranEnrollees;
            i++;


        });


    });

    $.get("/delphidata", function(data) {

        var locations = [];
        var pair = [];

        for (var i = 0; i < data.length; i++) {
            pair[1] = data[i].CITY;
            pair[2] = data[i].address + ", " + data[i].CITY;

            locations[i] = [pair[1], pair[2]];
        }

//        var infowindow = new google.maps.InfoWindow();
//        var geocoder = new google.maps.Geocoder();

        var i;

        for (i = 0; i < locations.length; i++) {
          geocodeAddress(locations[i]);
        }

    });

/////////// renders map
    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();

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

    function geocodeAddress2(location) {

        geocoder.geocode( { 'address': location[1]}, function(results, status) {
          //alert(status);
            if (status == google.maps.GeocoderStatus.OK) {

              //alert(results[0].geometry.location);
              map.setCenter(results[0].geometry.location);
              map.setZoom(14);
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

/////////// creat markers
    function createMarker(latlng,html){
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });

          gmarkers.push(marker);

          google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent(html);
            infowindow.open(map, marker);
          });

          google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });
    }

// Removes the markers from the map, but keeps them in the array.
function removeMarkers(){
    for(i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
}

/////////// autocomplete search box
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


    $('#clinic-form').submit(function(e) {

        // removeMarkers();
        var city = "";
        var address = "";
        var index = 0;
        var fulladd = "";
        var i;
        e.preventDefault();
        starting = $('#location').val();
       console.log(starting);
        $.post( "/map1", function( data ) {
            for (i=0; i<starting.length; i++){
              index = i;
              if (starting[i]!=","){
                address = address + starting[i];

              }
              else break;
            }
            for (i=i+1; i<starting.length; i++){
              index = i;
              if (starting[i]!=","){
                city = city + starting[i];
              }
              else break;
            }
            console.log(city);
            fulladd = fulladd + address + "," + city;
            geocodeAddress2([city, fulladd]);

        });
    });

    // $('#clinic-form').submit(function(e) {

    //     // removeMarkers();

    //     e.preventDefault();
    //     starting = $('#location').val();
    //    // console.log("search for: " + starting);
    //     $.post( "/map1", function( data ) {

    //         var locations = [];
    //         var pair = [];
    //         var str1;
    //         var str2 = starting;
    //         var j = 0;

    //         for (var i = 0; i < data.length; i++) {

    //             str1 = data[i].ZIP_CODE;

    //             if ((str1.localeCompare(str2)) == 0) {

    //                 console.log("inside: " + str1);
    //                 pair[1] = data[i].CITY;
    //                 pair[2] = data[i].address + ", " + data[i].CITY;
    //                 locations[j] = [pair[1], pair[2]];
    //                 j++;
    //             }
    //         }

    //         if(locations.length == 0) {
    //             alert("No clinics in your area. Please consider the ones listed or Enter a nearby zipcode.");

    //             for (var i = 0; i < data.length; i++) {
    //                 pair[1] = data[i].CITY;
    //                 pair[2] = data[i].address + ", " + data[i].CITY;

    //                 locations[i] = [pair[1], pair[2]];
    //             }
    //         }

    //         var i;

    //         for (i = 0; i < locations.length; i++) {
    //           geocodeAddress2(locations[i]/*["San Diego", "3520 Lebon Dr, San Diego"]*/);
    //         }
    //     });
    // });
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

