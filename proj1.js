// Kush Patel
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;

ctx.translate(radius, radius);
radius = radius * 0.90;

var hour = Math.floor((Math.random() * 12) + 1);
var hCopy = hour;

var minute = Math.floor((Math.random() * 59));
var mCopy = minute;

var second = Math.floor((Math.random() * 59));
var sCopy = second;

var startD = new Date();
var startT = startD.getTime() * 0.001;

// makes input form and back button visible, as well as drawing the clock
function beginDraw() {
  drawClock();
  document.getElementById("form1").style.display="block";
  document.getElementById("but1").style.visibility = "hidden";
  document.getElementById("but2").style.visibility = "hidden";
  document.getElementById("but3").style.display="block";
}

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'lightblue';
  ctx.fill();
  
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, 'black');
  grad.addColorStop(0.5, 'black');
  grad.addColorStop(1, 'black');
  
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){

    hour=hour%12;
    hour=(hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// validates password, gets average time, gets table
function checkPass() {
  var password = prompt("Please enter the Password: ");
  if (password == "Naruto") {
    
    if (localStorage.getItem("0") === null) {
      alert("No Student Has Played Yet!");
    }
    else {
      document.getElementById("but1").style.visibility = "hidden";
      document.getElementById("but2").style.visibility = "hidden";
      
      document.getElementById("studTable").style.display="block";
      document.getElementById("but3").style.display="block";
      document.getElementById("tip").style.display="block";
      document.getElementById("avg").style.display="block";


      var table = document.getElementById("studTable");
      var capsTab = table.createCaption();
      capsTab.innerHTML = "<b>Overall Student Performace</b>";
      
      var avgNumb = 0;
      var count = 0;
      for (var i=0, len = localStorage.length; i < len; ++i) {
        
        var studStr = localStorage.getItem(localStorage.key(i));
        var studArray = studStr.split(" ");

        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = studArray[0];
        cell2.innerHTML = studArray[1];
        cell3.innerHTML = studArray[2];
        avgNumb += parseInt(studArray[2]);
        count++;
      }
      var headTab = table.createTHead();

      var row = headTab.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = "First Name";
      cell2.innerHTML = "Last Name";
      cell3.innerHTML = "Time(Seconds) to Finish";
      avgNumb = avgNumb/count;
      document.getElementById("avg").innerHTML = "The Current Class Average is: " + avgNumb + " Seconds";

    }
  }
  else {
    alert("Whoops, wrong password entered (Remember it's CASE SENSITIVE!)");
  }
}

// validates input form, stores time in local storage
function validateForm() {

    var valF = document.forms["form1"]["fnames"].value;
    if (valF == "") {
        alert("First Name must be filled out");
        return false;
    }
    
    var valL = document.forms["form1"]["lnames"].value;
    if (valL == "") {
        alert("Last Name must be filled out");
        return false;
    }
    
    var val = document.forms["form1"]["hours"].value;
    if (val != hCopy) {
        alert("Hours: Try Again Silly Head!");
        return false;
    }
    val = document.forms["form1"]["minutes"].value;
    if (val != mCopy) {
        alert("Minutes: Try Again Silly Head!");
        return false;
    }
    val = document.forms["form1"]["seconds"].value;
    if (val != sCopy) {
        alert("Seconds: Try Again Silly Head!");
        return false;
    }
    var finalVal = valF + " " + valL;

    var nextD = new Date();
    var nextT = nextD.getTime() * 0.001;
    
    var diffT = Math.floor(nextT - startT);
    var totSec = diffT.toString();

		document.getElementById('congrats').play();
    alert("That's Right, Good Job!");
    alert("It took " + finalVal + " "+ totSec + " seconds to finish!");

    if (localStorage.getItem("0") === null) {
        localStorage.setItem("0", finalVal + " " + totSec);
    }
    else {
        var storeLen = localStorage.length;
        var nextStore = storeLen.toString();
        localStorage.setItem(nextStore, finalVal + " " + totSec);
    }
}

// reloads page
function refreshGame() {
  location.reload();
}