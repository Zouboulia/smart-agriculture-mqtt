var mqtt = require("mqtt");
var port = 1883;

//create options object
var options = {
  port: port,
  clean: true,
  clientId: "temperature_subscriber",
};

//create client
var client = mqtt.connect(options);

//subscribe function
client.on("connect", function () {
  console.log("connected"); //log to console when connected
  //subscriber to topic related to soil temperature
  if (client.connected) {
    client.subscribe("/field/soil/temperature", { qos: 2 }, function (err) {
      if (err) {
        console.error("Error subscribing to topic:", err);
      } else {
        console.log("Subscribed successfully");
      }
    });
  }
});

//message function to send message
client.on("message", function (topic, message) {
  console.log(
    "Received a new message from: " + topic + ": " + message.toString()
  );
});
