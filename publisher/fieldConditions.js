var mqtt = require("mqtt");
var port = 1883;

var options = {
  port: port,
  clean: true,
  clientId: "field_publisher",
};

var client = mqtt.connect(options);

function init() {
  client.on("connect", function () {
    //create arrays of random values to publish
    var tempValues = [20, 15, 22, 7, 18, 11];
    var moistureValues = [50, 42, 25, 78, 30, 55];

    //create interval to publish every 1 second the values
    setInterval(function () {
      //create random values from arrays to publish
      var temp = tempValues[Math.floor(Math.random() * tempValues.length)];
      var moisture =
        moistureValues[Math.floor(Math.random() * moistureValues.length)];

      //this creates random values for PH of the soil
      var ph = Math.random() * 10;

      //this creates random values for health of the field
      var health = Math.random() > 0.5;

      //this creates random values for UV exposure
      var uv = Math.random() * 10;

      //publish random values to topics
      client.publish(
        "/field/soil/temperature",
        "the temperature of the soil is: " + temp.toString() + " degrees",
        {
          qos: 2,
          retain: false,
        }
      );
      client.publish(
        "/field/soil/moisture",
        "The moisture of the soil is: " + moisture.toString() + " % humidity.",
        {
          qos: 2,
          retain: false,
        }
      );
      client.publish(
        "/field/soil/PH",
        "The PH of the soil is: " + ph.toString(),
        {
          qos: 2,
          retain: false,
        }
      );

      client.publish(
        "/field/health",
        "The field is heathly: " + health.toString(),
        {
          qos: 2,
          retain: true, //this is set to true so that the last value is retained and can be read by the subscriber
        }
      );
      client.publish(
        "/field/uv/exposure",
        "The field is exposed to: " + uv.toString(),
        {
          qos: 2,
          retain: false,
        }
      );
    }, 1000);
  });
}

//export the functions init (that contains the interval to publish random values above) and close
module.exports = {
  init: init,
};
