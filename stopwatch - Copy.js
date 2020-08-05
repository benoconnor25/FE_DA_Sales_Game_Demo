var myTimer;
var elements = []; //creating array to store each element in an object
var answer = []; //creating array to store the correct answer
var combos = [];
var gameHasStarted = false; //set to false before the game begins 
var answerGenerated = false;
var dataGenerated = false;
var totalScore = 0;
var roundNum = 1;
var correctAnswer = false;
var numSales = 0;
var largest = 0;
var largestCombo = '';

function clock() {
   if (!gameHasStarted) {
      myTimer = setInterval(myClock, 1000);
      var c = 1000;
      gameHasStarted = true; //set to true once Begin Timer is clicked
      document.getElementById('result').innerHTML = ''; //clears out the result of the last round

      function myClock() {
         document.getElementById("demo").innerHTML = --c;
         if (c == 0) {
            clearInterval(myTimer);
            alert("Reached zero");
         }
      }
   }
};

function stopClock() {
   if (correctAnswer) {
      var timeLeft = document.getElementById('demo').innerHTML;
      totalScore = totalScore + parseInt(timeLeft); //parsing the string into an Integer
      roundNum = roundNum + 1; //increments round by +1
      clearInterval(myTimer);
      gameHasStarted = false; //when 'stop timer' is clicked, all other buttons will be unclickable until 'begin timer' is clicked again
      answerGenerated = false;
      dataGenerated = false;
      correctAnswer = false;
      answer = []; //clears array
      elements = []; //clears array
      combos = [];
      document.getElementById('round').innerHTML = roundNum; //sets new round num
      document.getElementById('quantity').value = ''; //clears the total sales by product/region answer 
      document.getElementById('myTable').innerHTML = '<th>Region</th><th>Product</th><th>Qty</th><th>Price</th>'; //clears html table
      document.getElementById('salesbyregion').innerHTML = '<th>Region</th><th>Product</th>'; //clears html table
      document.getElementById('total').innerHTML = totalScore; //clears totalscore
      document.getElementById('regionSelect').value = ''; //clears user entered region answer
      document.getElementById('productSelect').value = ''; //clears user entered product answer
      largest = 0;
      largestCombo = '';
   } else {
      alert("You must enter the correct answer before moving to the next round.");
   }
}


function createTable() {
   if (gameHasStarted & !dataGenerated) { //checks if Begin Timer has been clicked & data hasnt been generated
      rn = 500;
      cn = 4;
      dataGenerated = true;

      for (var r = 0; r < parseInt(rn, 10); r++) {
         var x = document.getElementById('myTable').insertRow(r + 1);
         var random_number = Math.floor(Math.random() * 100);
         console.log(random_number);
         var number_two = Math.floor(Math.random() * 25);
         var things = ['Rock', 'Paper', 'Scissors'];
         var thing = things[Math.floor(Math.random() * things.length)];
         var regions = ['North', 'South', 'East', 'West'];
         var region = regions[Math.floor(Math.random() * regions.length)];

         var element = {}; //creating an 'element' object for each entry into the table
         element.number_two = number_two;
         element.random_number = random_number;
         element.region = region;
         element.thing = thing;
         elements.push(element); //pushing element into our array of elements

         //price

         for (var c = 0; c < parseInt(1, 10); c++) {
            var y = x.insertCell(c);
            y.innerHTML = number_two;
         }

         //qty
         for (var c = 0; c < parseInt(1, 10); c++) {
            var y = x.insertCell(c);
            y.innerHTML = random_number;
         }
         //product        
         for (var c = 0; c < parseInt(1, 10); c++) {
            var y = x.insertCell(c);
            y.innerHTML = thing;
         }

         //region        

         for (var c = 0; c < parseInt(1, 10); c++) {
            var y = x.insertCell(c);
            y.innerHTML = region;
         }

      }
   } 
}
//crate sales by region table
function createTable2() {
   if (gameHasStarted && !answerGenerated) { //checks if Begin Timer has been clicked & if answer has been generated yet
      rn = 1;
      cn = 2;
      answerGenerated = true;

      for (var r = 0; r < parseInt(rn, 10); r++) {
         var x = document.getElementById('salesbyregion').insertRow(r + 1);
         var things = ['Rock', 'Paper', 'Scissors'];
         var thing = things[Math.floor(Math.random() * things.length)];
         var regions = ['North', 'South', 'East', 'West'];
         var region = regions[Math.floor(Math.random() * regions.length)];

         answer.push(thing);
         answer.push(region);

         //price

         for (var c = 0; c < parseInt(1, 10); c++) {
            var y = x.insertCell(c);
            y.innerHTML = thing;
         }

         //qty
         for (var c = 0; c < parseInt(1, 10); c++) {
            var y = x.insertCell(c);
            y.innerHTML = region;
         }

      }
   }
}

function checkAnswer() {
   var userInput = document.getElementById('quantity').value;
   var regionInput = document.getElementById('regionSelect').value;
   var productInput = document.getElementById('productSelect').value;

   if (gameHasStarted && ((userInput != '') && (regionInput != '') && (productInput != ''))) { //checks to make sure the user has entered answers before being able to "Check Answer"
      var totalSales = regionInput + productInput;
      var totalQuantity = 0;
      var things = ['Rock', 'Paper', 'Scissors'];
      var regions = ['North', 'South', 'East', 'West'];

      for (var i = 0; i < elements.length; i++) {
         if ((elements[i].thing == answer[0]) && (elements[i].region == answer[1])) {
            totalQuantity = totalQuantity + (elements[i].number_two * elements[i].random_number); //calculates total sales for the generated product/region
         }
      }

      for (var i = 0; i < regions.length; i++) {
         for (var j = 0; j < things.length; j++) {
            var combo = {};
            combo.combo = regions[i] + things[j];
            combo.value = 0;
            combos.push(combo) //loops through both arrays and compiles all possible combos
         }
      }

      for (var i = 0; i < combos.length; i++) {
         for (var j = 0; j < elements.length; j++) {
            if (combos[i].combo == (elements[j].region + elements[j].thing)) {
               combos[i].value = combos[i].value + (elements[j].number_two * elements[j].random_number); //stores the total sales for each combo in an object array
            }
         }
      }

      for (var i = 0; i < combos.length; i++) {
         if (largest < combos[i].value) {
            largest = combos[i].value;
            largestCombo = combos[i].combo; //loops through the object array created above and compares each elements value and stores the highest value/combo (answer for highest total sales question)
         }
      }

      alert('[*For testing purposes*] Answer is: ' + largestCombo + ' and ' + totalQuantity); //uncomment this if you want the correct answer to display for testing purposes before it tells you if the answer is correct or incorrect

      if (totalQuantity == userInput && largestCombo == totalSales) {
         document.getElementById("result").style.color = "green";
         document.getElementById('result').innerHTML = 'You entered the correct answers!';
         correctAnswer = true;
         stopClock();
      } else if (totalQuantity != userInput) {
         document.getElementById("result").style.color = "red";
         document.getElementById('result').innerHTML = '"' + userInput + '"' + ' is not the correct amount of total sales for the random product and region. Try Again.';
      } else if (largestCombo != totalSales) {
         document.getElementById("result").style.color = "red";
         document.getElementById('result').innerHTML = '"' + regionInput + '"' + ' and ' + '"' + productInput + '"' + ' is not the combination with the highest number of sales. Try Again.';
      }

   }

}


function exportTableToCSV(filename) {
   if (gameHasStarted) { //checks if Begin Timer has been clicked
      var csv = [];
      var rows = document.querySelectorAll("table tr");
      for (var i = 0; i < rows.length; i++) {
         var row = [],
            cols = rows[i].querySelectorAll("td, th");
         for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
         csv.push(row.join(","));
      }
      // Download CSV file
      downloadCSV(csv.join("\n"), filename);
   } else {
      alert("Game has not begun.");
   }
}

function downloadCSV(csv, filename) {
   if (gameHasStarted) { //checks if Begin Timer has been clicked
      var csvFile;
      var downloadLink;
      // CSV file
      csvFile = new Blob([csv], {
         type: "text/csv"
      });
      // Download link
      downloadLink = document.createElement("a");
      // File name
      downloadLink.download = filename;
      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);
      // Hide download link
      downloadLink.style.display = "none";
      // Add the link to DOM
      document.body.appendChild(downloadLink);
      // Click download link
      downloadLink.click();
   } else {
      alert("Game has not begun.");
   }
}