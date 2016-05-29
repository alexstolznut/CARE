
var total = 0;
var total2 = 0;
var itemCount = 0;
var uniquevets;
var propo;

"use strict";
$.getJSON("/vamentalhealth.json", function (data) {

    // Iterate the groups first.
    $.each(data, function (index, value) {

        // Get all the categories
        var items = this.Item;
        // console.log(items);
        if (items == "Unique Veterans Seen In Inpatient Mental Health") {
            var value = this.Value;
            total = parseInt(value) + total;
            uniquevets = items;
        }
        if(items === "Proportion of Veterans with Possible Mental Illness Seen in Any Mental Health"){
            propo = items;
            var val = this.Value;
            var number = "";

            for (var i = 0, len = val.length; i < len-1; i++) {
              number=number+val[i];
            }
            console.log(number);

            total2 = parseInt(number) + total2;
            itemCount++;
        }

    });
    console.log(total2/itemCount);
    names = [uniquevets,propo];
    pieChart([total2/itemCount, 100-total2/itemCount], names);
    barChart(total);
});

function pieChart(totals, names) {
    var data=totals;

    var width = 960,
        height = 500,
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


function barChart(totals) {
    var data=[totals];


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