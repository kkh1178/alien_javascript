// importing data from data.js
var tableData = data;

// Grab the table I have in my html file and call it table.
var table = d3.select(".table");

//Select the body of the table 
var tbody = d3.select("tbody");


// 1. Function that takes data and builds table

function buildTable(data){

    // data === [ {}, {}]
    data.forEach((item) => {
        // append tr element to the table
        var row = tbody.append("tr");
        Object.entries(item).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });
    
    });
}

// Call table building function
buildTable(tableData);

// 2. Click or Change handler function that takes input, updates data, calls buildTable again
var submit = d3.select("#submit");

submit.on("click", function () {

    console.log("made it here");
    
    // Clear the current table
    tbody.html("");

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#example-form-input");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    // var value = d3.event.target.value;
    console.log("made it here 2", inputValue);


    // Filtering based on the date
    var filteredData = tableData.filter(row => row.datetime === inputValue);
    // If they input a date not found in the table, let them know; otherwise build the table from filterdata.
    if (!inputValue){
        buildTable(tableData);
    }
    else if (filteredData.length === 0) {
        alert(`${inputValue} not found.`);
        // d3.select("#example-form-input").text("Hey, I changed this!");
        buildTable(tableData);

    }
    else {
        
        console.log("filtered", filteredData);
        buildTable(filteredData);
    };
    
});
