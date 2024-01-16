var mqtt = require("mqtt");
var port = 1883;

var options = {
  port: port,
  clean: true,
  clientId: "equipment_publisher",
};

var client = mqtt.connect(options);

function equip() {
  client.on("connect", function () {
    //create array of locations to choose from
    var location = ["field A", "field B", "warehouse", "storage"];

    setInterval(function () {
      //create random values for equipment status by using Math.random() > 0.5 which will return true or false
      var statusSprinkler = Math.random() > 0.5;
      var statusHarvester = Math.random() > 0.5;

      //create random values for equipment location
      var locationSprinkler =
        location[Math.floor(Math.random() * location.length)];
      var locationHarvester =
        location[Math.floor(Math.random() * location.length)];

      client.publish(
        "/equipment/sprinkler/status",
        "The sprinkler is ON : " + statusSprinkler.toString(),
        {
          qos: 2,
          retain: true, //retain the last message sent
        }
      );
      client.publish(
        "/equipment/sprinkler/location",
        "The sprinkler is currently in : " + locationSprinkler.toString(),
        {
          qos: 2,
          retain: false,
        }
      );
      client.publish(
        "/equipment/harvester/status",
        "The harvester is ON : " + statusHarvester.toString(),
        {
          qos: 2,
          retain: false,
        }
      );
      client.publish(
        "/equipment/harvester/location",
        "The harvester is currently in : " + locationHarvester.toString(),
        {
          qos: 2,
          retain: false,
        }
      );
    }, 500); //publish equipment information every half second
  });
}

module.exports = {
  equip: equip,
};
