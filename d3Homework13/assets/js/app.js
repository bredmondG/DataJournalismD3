var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// load data from csv  
d3.csv("assets/data/data.csv").then(function(healthData) {

    console.log(healthData)

    healthData.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
        console.log(data.smokes)
        console.log(data.age)
    });

    //  Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d => d.age)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([height, 0]);

    //  Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);


    //  Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5")

    // append text to circles
    healthData.forEach((data) => {
        chartGroup.append("text")
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text(data.abbr)
            .attr("x", xLinearScale(data.age))
            .attr("y", yLinearScale(data.smokes))
    })
});