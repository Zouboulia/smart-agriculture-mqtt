// Initiate the fieldConditions module
const fieldConditions = require("./fieldConditions");
const equipment = require("./equipmentPublisher");

// Call the functions in the modules
fieldConditions.init();
equipment.equip();
