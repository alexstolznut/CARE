var county = [];
var gmarkers = [];
var overlay;
var layer;
var map;
var cityCircle;
var outpatientcircles = [];
var ptsdcircles = [];
var receivedcare = [];
var currArray;
var infowindow;
var geocoder;

function outpatient() {
    removeMarkers();
    removeCircles(currArray);
    var percent = [];
    var station = [];
    var facility = [];
    var addresses = [];
    var lati = [];
    var longi = [];
    $.getJSON("/facilities.json", function (data) {

        // Iterate the groups first.
        var eachdata = data.VAFacilityData;
        $.each(eachdata, function (index, value) {
          facility[index] = value.facility_id;
          addresses[index] = value.address + ", " + value.city;
          lati[index] = value.latitude;
          longi[index] = value.longitude;
        }); // end of second each
    // console.log(facility[0] + "," + addresses[0] + "," + lati[0] + "," + longi[0]);
    getPTSD(facility, addresses, lati, longi);


    }); // end of second getjson


    function getPTSD(fac, addr, lat, lon){
      // var percentToStation = [];
      var index = 0;

      $.getJSON("/ptsd.json", function (data) {
          // Iterate the groups first.
          var ind = 0;
          $.each(data, function (index, value) {
            if (value.Category == "Station-Level Stats" && value.Item == "% of Veterans w/PTSD receiving MH out- patient care") {
              var loc = value.Location;
              percent[ind] = value.Value;
              station[ind] = loc;
              ind++;
            } // of of if
          }); // end of each
    // console.log(fac[0] + "," + addr[0] + "," + lat[0] + "," + lon[0] + "," + percent[0] + "," + station[0]);

          comparePTSD(fac,addr, lat, lon, percent,station);

      }); // end of first get json
      // return percentToStation;
    }

    function comparePTSD(fac,addr,lat,lon,per,stat) {
      var addToPercent = [];
      var index = 0;
      for (var i = 0; i<per.length; i++){
        for (var j=0; j<addr.length; j++){
          if (stat[i] == fac[j]) {
            addToPercent[index] = [lat[j], lon[j], addr[j], per[i], stat[i]];
            index++;
          }
        }
      }

      circles(addToPercent); ///// TO DO : make circles based on PTSD percent
    }

    function circles(addtoper) {
      for (var i=0; i<addtoper.length;i++) {
          var cen = {lat: parseFloat(addtoper[i][0]), lng: parseFloat(addtoper[i][1])};
          // console.log(cen);
          // Add the circle for this city to the map.
          cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: '#004B54',
            fillOpacity: 0.35,
            title: addtoper[i][3],
            map: map,
            center: cen,
            radius: Math.sqrt(addtoper[i][3]) * 1000
          });

          outpatientcircles.push(cityCircle);

          // //circle is the google.maps.Circle-instance
          // google.maps.event.addListener(cityCircle,'mouseover',function(){
          //      this.getMap().getDiv().setAttribute('title',this.get('title'));});

          // google.maps.event.addListener(cityCircle,'mouseout',function(){
          //      this.getMap().getDiv().removeAttribute('title');});

          // console.log(addtoper[i][3]);
      }


    }
    currArray = outpatientcircles;
}

function ptsd(){
    removeMarkers();
    removeCircles(currArray);
    var percent = [];
    var station = [];
    var facility = [];
    var addresses = [];
    var lati = [];
    var longi = [];
    $.getJSON("/facilities.json", function (data) {

        // Iterate the groups first.
        var eachdata = data.VAFacilityData;
        $.each(eachdata, function (index, value) {
          facility[index] = value.facility_id;
          addresses[index] = value.address + ", " + value.city;
          lati[index] = value.latitude;
          longi[index] = value.longitude;
        }); // end of second each
    // console.log(facility[0] + "," + addresses[0] + "," + lati[0] + "," + longi[0]);
    getPTSD(facility, addresses, lati, longi);


    }); // end of second getjson


    function getPTSD(fac, addr, lat, lon){
      // var percentToStation = [];
      var index = 0;

      $.getJSON("/ptsd.json", function (data) {
          // Iterate the groups first.
          var ind = 0;
          $.each(data, function (index, value) {
            if (value.Category == "Station-Level Stats" && value.Item == "% of Veterans served with PTSD") {
              var loc = value.Location;
              percent[ind] = value.Value;
              station[ind] = loc;
              ind++;
            } // of of if
          }); // end of each
    // console.log(fac[0] + "," + addr[0] + "," + lat[0] + "," + lon[0] + "," + percent[0] + "," + station[0]);

          comparePTSD(fac,addr, lat, lon, percent,station);

      }); // end of first get json
      // return percentToStation;
    }

    function comparePTSD(fac,addr,lat,lon,per,stat) {
      var addToPercent = [];
      var index = 0;
      for (var i = 0; i<per.length; i++){
        for (var j=0; j<addr.length; j++){
          if (stat[i] == fac[j]) {
            addToPercent[index] = [lat[j], lon[j], addr[j], per[i], stat[i]];
            index++;
          }
        }
      }

      circles(addToPercent); ///// TO DO : make circles based on PTSD percent
    }


    function circles(addtoper) {
      for (var i=0; i<addtoper.length;i++) {
        var cen = {lat: parseFloat(addtoper[i][0]), lng: parseFloat(addtoper[i][1])};
        // console.log(cen);
        // Add the circle for this city to the map.
        cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 0,
          fillColor: '#004B54',
          fillOpacity: 0.35,
          map: map,
          center: cen,
          radius: Math.sqrt(addtoper[i][3]) * 1000
        });
        ptsdcircles.push(cityCircle);
      }
    }

    currArray = ptsdcircles;
}

function receivedvacare(){
    removeMarkers();
    removeCircles(currArray);

    var percent = [];
    var station = [];
    var facility = [];
    var addresses = [];
    var lati = [];
    var longi = [];
    $.getJSON("/facilities.json", function (data) {

        // Iterate the groups first.
        var eachdata = data.VAFacilityData;
        $.each(eachdata, function (index, value) {
          facility[index] = value.facility_id;
          addresses[index] = value.address + ", " + value.city;
          lati[index] = value.latitude;
          longi[index] = value.longitude;
        }); // end of second each
    // console.log(facility[0] + "," + addresses[0] + "," + lati[0] + "," + longi[0]);
    getPTSD(facility, addresses, lati, longi);


    }); // end of second getjson


    function getPTSD(fac, addr, lat, lon){
      // var percentToStation = [];
      var index = 0;

      $.getJSON("/ptsd.json", function (data) {
          // Iterate the groups first.
          var ind = 0;
          $.each(data, function (index, value) {
            if (value.Category == "Station-Level Stats" && value.Item == "% of Veterans with PTSD that received any MH care") {
              var loc = value.Location;
              percent[ind] = value.Value;
              station[ind] = loc;
              ind++;
            } // of of if
          }); // end of each
    // console.log(fac[0] + "," + addr[0] + "," + lat[0] + "," + lon[0] + "," + percent[0] + "," + station[0]);

          comparePTSD(fac,addr, lat, lon, percent,station);

      }); // end of first get json
      // return percentToStation;
    }

    function comparePTSD(fac,addr,lat,lon,per,stat) {
      var addToPercent = [];
      var index = 0;
      for (var i = 0; i<per.length; i++){
        for (var j=0; j<addr.length; j++){
          if (stat[i] == fac[j]) {
            addToPercent[index] = [lat[j], lon[j], addr[j], per[i], stat[i]];
            index++;
          }
        }
      }

      circles(addToPercent); ///// TO DO : make circles based on PTSD percent
    }


    function circles(addtoper) {
      for (var i=0; i<addtoper.length;i++) {
        var cen = {lat: parseFloat(addtoper[i][0]), lng: parseFloat(addtoper[i][1])};
        // console.log(cen);
        // Add the circle for this city to the map.
        cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 0,
          fillColor: '#004B54',
          fillOpacity: 0.35,
          map: map,
          center: cen,
          radius: Math.sqrt(addtoper[i][3]) * 1000
        });
        receivedcare.push(cityCircle);
      }
    }

    currArray = receivedcare;
}

function removeCircles(circlearray){
    for(i=0; i<circlearray.length; i++){
        circlearray[i].setMap(null);
    }
}

// Removes the markers from the map, but keeps them in the array.
function removeMarkers(){
    for(i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
}

function cliniclocations(){
    removeCircles(currArray);
    $.get("/delphidata", function(data) {

        var locations = [];
        var pair = [];

        for (var i = 0; i < data.length; i++) {
            pair[1] = data[i].CITY;
            pair[2] = data[i].address + ", " + data[i].CITY;

            locations[i] = [pair[1], pair[2]];
        }

        var i;

        for (i = 0; i < locations.length; i++) {
          geocodeAddress(locations[i]);
        }

    });

    // renders map
    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();
}

/////////// create markers
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

function geocodeAddress2(location) {

    // renders map
    infowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();

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

function geocodeAddress(location) {

    // renders map
    infowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();


    geocoder.geocode( { 'address': location[1]}, function(results, status) {
      //alert(status);
        if (status == google.maps.GeocoderStatus.OK) {

          //alert(results[0].geometry.location);
          map.setCenter(results[0].geometry.location);
          // console.log(results[0].geometry.location);
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
            i++;
        });
    });

    var county = [];
    var enrollees = [];
    var counties = [];
    var i = 0;

    $.getJSON("/veteranenrollees.json", function (data) {

        var databycounty = data.DataByCounty;
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

    var percent = [];
    var station = [];
    var facility = [];
    var addresses = [];
    var lati = [];
    var longi = [];
    $.getJSON("/facilities.json", function (data) {

        // Iterate the groups first.
        var eachdata = data.VAFacilityData;
        $.each(eachdata, function (index, value) {
          facility[index] = value.facility_id;
          addresses[index] = value.address + ", " + value.city;
          lati[index] = value.latitude;
          longi[index] = value.longitude;
        }); // end of second each
    // console.log(facility[0] + "," + addresses[0] + "," + lati[0] + "," + longi[0]);
    getPTSD(facility, addresses, lati, longi);


    }); // end of second getjson


    function getPTSD(fac, addr, lat, lon){
      // var percentToStation = [];
      var index = 0;

      $.getJSON("/ptsd.json", function (data) {
          // Iterate the groups first.
          var ind = 0;
          $.each(data, function (index, value) {
            if (value.Category == "Station-Level Stats" && value.Item == "% of Veterans served with PTSD") {
              var loc = value.Location;
              percent[ind] = value.Value;
              station[ind] = loc;
              ind++;
            } // of of if
          }); // end of each
    // console.log(fac[0] + "," + addr[0] + "," + lat[0] + "," + lon[0] + "," + percent[0] + "," + station[0]);

          comparePTSD(fac,addr, lat, lon, percent,station);

      }); // end of first get json
      // return percentToStation;
    }

    function comparePTSD(fac,addr,lat,lon,per,stat) {
      var addToPercent = [];
      var index = 0;
      for (var i = 0; i<per.length; i++){
        for (var j=0; j<addr.length; j++){
          if (stat[i] == fac[j]) {
            addToPercent[index] = [lat[j], lon[j], addr[j], per[i], stat[i]];
            index++;
          }
        }
      }

      circles(addToPercent); ///// TO DO : make circles based on PTSD percent
    }


    function circles(addtoper) {
      for (var i=0; i<addtoper.length;i++) {
        var cen = {lat: parseFloat(addtoper[i][0]), lng: parseFloat(addtoper[i][1])};
        // console.log(cen);
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 0,
          fillColor: '#004B54',
          fillOpacity: 0.35,
          map: map,
          center: cen,
          radius: Math.sqrt(addtoper[i][3]) * 1000
        });
        ptsdcircles.push(cityCircle);
      }
      currArray = ptsdcircles;
    }

    // autocomplete search box
    var autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('location')), {
         types: ['geocode']
    });

    $('#clinic-form').submit(function(e) {
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

}
