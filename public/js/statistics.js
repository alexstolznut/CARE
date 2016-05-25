
var total = 0;

(function(d3) {

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
        renderChart(data);
    });

    function renderChart(total) {
        var body = d3.select("graph");
        console.log(total);
        var div = document.createElement("div");
        div.html("Hello, world!");
    }




});
