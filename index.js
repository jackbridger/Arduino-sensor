const fs = require('fs');
const port = 3000
// var five = require('johnny-five');
// var board = new five.Board();

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// board.on('ready', function () {
//     // var led = new five.Led(1); // pin 13
//     // led.blink(1500); // 500ms interval
//     const mySensor = new five.Sensor("A0");
//     io.on('connection', function (socket) {

//         mySensor.on("change", function (event) {
//             const currentTime = Date.now();
//             const output = this.scaleTo(0, 1000) + " " + currentTime + "\n"
//             const timeObj = { x: currentTime, y: this.scaleTo(0, 10) }
//             socket.emit('emg', timeObj);

//             fs.appendFile("test.txt", output, function (err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was saved!");
//             });
//         });

//     });
// })
const EMG_CHANNEL = "EMG_CHANNEL";
let currentStrength = 0;
let intervalID;

io.on('connection', function (socket) {
    console.log("user connected")

    if (intervalID) {
        clearInterval(intervalID);
    }

    intervalID = setInterval(() => {
        console.log("something emitted")
        currentStrength = Math.floor(Math.random() * 1000);
        io.emit(EMG_CHANNEL, currentStrength)
    }, 1000);
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
