
var total = 0;


"use strict";
$.getJSON("/vamentalhealth.json", function (data) {

    // Iterate the groups first.
    $.each(data, function (index, value) {

        // Get all the categories
        var items = this.Item;
        if (items == "Unique Veterans Seen In Inpatient Mental Health") {
            var value = this.Value;
            total = parseInt(value) + total;
        }

    });
    renderChart(total);
});

function renderChart(total) {
    var data=[total];

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


