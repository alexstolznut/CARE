
var total = 0;
var total2 = 0;
var total3 = 0;
var total4 = 0;
var total5 = 0;
var total6 = 0;
var itemCount = 0;
var itemCount2 = 0;
var itemCount3 = 0;
var itemCount4 = 0;
var uniquevets;
var propo;
var service;
var percentmi;

"use strict";
$.getJSON("/vamentalhealth.json", function (data) {

    // Iterate the groups first.
    $.each(data, function (index, value) {

        // Get all the categories
        var items = this.Item;

        if (items == "Unique Veterans Seen In Inpatient Mental Health") {
            var v = this.Value;
            total = parseInt(v) + total;
            uniquevets = items;
        }
        if(items == "Proportion of Veterans with Possible Mental Illness Seen in Any Mental Health"){
            propo = items;
            var val = this.Value;
            var number = "";

            for (var i = 0, len = val.length; i < len-1; i++) {
              number=number+val[i];
            }

            total2 = parseInt(number) + total2;
            itemCount++;
        }
        if(items =="Number of Service Users with Possible Mental Illness"){
            service = items;
            var values = this.Value;
            var num = "";

            for (var i = 0, len = values.length; i < len; i++) {
              if (values[i] != ",") {
                num=num+values[i];
              }
            }

            total3 = parseInt(num) + total3;
        }
        if(items=="Percent of Service Users with Possible Mental Illness"){
            percentmi = items;
            var val = this.Value;
            var number = "";
            for (var i = 0, len = val.length; i < len-1; i++) {
              number=number+val[i];
            }
            total4 = parseInt(number) + total4;
            itemCount2++;
        }
        if(items == "Proportion of Veterans with Possible Mental Illness Seen in Inpatient Mental Health"){
            var val = this.Value;
            var number = "";
            for (var i = 0, len = val.length; i < len-1; i++) {
              number=number+val[i];
            }
            total5 = parseInt(number) + total5;
            itemCount3++;

        }
        if(items == "Proportion of Veterans with Confirmed Mental Illness Seen in Any Mental Health"){
            var val = this.Value;
            var number = "";
            for (var i = 0, len = val.length; i < len-1; i++) {
              number=number+val[i];
            }
            total6 = parseInt(number) + total6;
            itemCount4++;

        }
    });
    names = [uniquevets,propo,service];
    pieChart([total2/itemCount, 100-total2/itemCount], names);
    barChart([total,total3], names);
    pieChart2([total4/itemCount2, 100-total4/itemCount2]);
    pieChart3([total5/itemCount3, 100-total5/itemCount3]);
    pieChart3([total6/itemCount4, 100-total6/itemCount4]);

});

$.getJSON("/veteranenrollees.json", function (data) {

    var databycounty=data.DataByCounty;
    // Iterate the groups first.
    $.each(databycounty, function (index, value) {

        // Get all the categories
        var StateAbbrev = this.StateAbbrev;

        if (StateAbbrev == "CA") {
            var county = this.CountyName;
            console.log(county);
        }
    });
});

function pieChart(totals, names) {
    var data=totals;

    var width = 760,
        height = 300,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });

    var svg = d3.select(".pie").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data; });
}

function pieChart2(totals) {
    var data=totals;

    var width = 760,
        height = 300,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });

    var svg = d3.select(".pie2").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data; });
}

function pieChart3(totals) {
    var data=totals;

    var width = 760,
        height = 300,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });

    var svg = d3.select(".pie3").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data; });
}

function pieChart3(totals) {
    var data=totals;

    var width = 760,
        height = 300,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });

    var svg = d3.select(".pie4").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data; });
}

function barChart(totals, names) {
    var data=totals;

    // need to work on the bar chart
    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

        d3.select(".chart")
          .selectAll("div")
            .data(data)
          .enter().append("div")
            .style("width", function(d) { return x(d) + "px"; })
            .text(function(d) { return d; });
}