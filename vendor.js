'use strict';

require('dotenv').config(); // bring in the env file
const flowerShop = process.env.FLOWERSHOP; // .env


// library that creates a mass amount of fake data 
const faker = require('faker'); 

// bring in the other dependencies 
const events = require('./event-pool'); 


// setInterval // every 5 seconds, generating a new order with "pickup" status with our new order object as the payload. 

setInterval(() => {

  let order = {
    storeName: flowerShop, 
    orderID: faker.random.uuid(), 
    customer: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),
  };

  events.emit('pickup', order);
}, 5000); 


// THANKING THE CUSTOMER: 
events.on('delivered', payload => thankYou(payload));


function thankYou(payload) {
  console.log('FROM THE VENDOR: Thank you!', payload.orderID);
}

// Vendor Module: 
// [ ] Declare your store name (perhaps in a .env file, so that this module is re-usable)

// [x] Every 5 seconds, simulate a new customer order:
// [x] Create a fake order, as in an object: storeName, orderID, customerName, address

// [ ] Emit a pickup event and attach the order as a payload
// // [ ] Use the faker library to make up fake info

// // Monitor the system for events: 
// // [ ] Whenever the 'delivered' event occurs, log "thank you" to the console. 


