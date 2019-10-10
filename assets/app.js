  // Your web app's Firebase configuration
  var Config = {
    apiKey: "AIzaSyDLlEX8HCeYEsqtMBBPEYIV1c44YVL09h8",
    authDomain: "trains-5f642.firebaseapp.com",
    databaseURL: "https://trains-5f642.firebaseio.com",
    projectId: "trains-5f642",
    storageBucket: "trains-5f642.appspot.com",
    messagingSenderId: "793339190407",
    appId: "1:793339190407:web:df3c587c862b7eddee2c22"
  };
  // Initialize Firebase
firebase.initializeApp(Config);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    // var newTrain = {
    //     name: trainName,
    //     destination: destination,
    //     firstTrain: firstTrainTime,
    //     frequency: frequency
    // };
    // database.ref().push(newTrain);
    database.ref().push({
        name: trainName,
        destination: destination,
        train: firstTrainTime,
        frequency: frequency
    })

$("#train-name").val("")
$("#destination").val("")
$("#firstTrainTime").val("")
$("#frequency").val("")
});

database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequency),
    );
    $("#train-table > tbody").append(newRow);
});



var tFrequency = 3;
var firstTime = "03:30";
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// current time
var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("hh:mm"));
// difference b/w times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference In Time: " + diffTime);
//time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);
//minute until train
var tMinutesTilTrain = tFrequency - tRemainder;
console.log("Minutes Until Train: " + tMinutesTilTrain);
// next train 
var nextTrain = moment().add(tMinutesTilTrain, "minutes");
console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));



