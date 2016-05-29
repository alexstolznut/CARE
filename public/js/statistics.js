
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

    renderChart([total, total2]);
});

function renderChart(totals) {
    var data=totals;


    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

        d3.select(".chart")
          .selectAll("div")
            .data(data)
          .enter().append("div")
            .style("width", function(d) { return x(d) + "px"; })
            .text(function(d) { return d; });


    // d3.select(".chart")
    //   .selectAll("div")
    //     .data(data)
    //   .enter().append("div")
    //     .style("width", function(d) { return x(d[0]) + "px"; })
    //     .text(function(d) { return d[0]; });

    // var yTextPadding = 20;



}


