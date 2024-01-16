var mqtt = require("mqtt");
var port = 1883;

//create options object
var options = {
  port: port,
  //if I want to facilitate disconnected clients to receive missed messages when they reconnect I can
  //set clean to false. This will make the broker store the messages for the client until it reconnects
  clean: true,
  clientId: "equipment_subscriber",
};

//create client
var client = mqtt.connect(options);

//subscribe function
client.on("connect", function () {
  console.log("connected"); //log to console when connected

  //subscriber to topic related to soil temperature
  if (client.connected) {
    client.subscribe("/equipment/#", { qos: 2 }, function (err) {
      if (err) {
        console.error("Error subscribing to topic:", err);
      } else {
        console.log("Subscribed successfully");
      }
    });
    //We could also use "+" to subscribe to specific topics under the equipment topic
    //client.subscribe("/equipment/+/location"
    //client.subscribe("/equipment/+/status"
  }
});

//message function to send message
client.on("message", function (topic, message) {
  console.log(
    "Received a new message from: " + topic + ": " + message.toString()
  );
});
