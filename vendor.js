'use strict';

require('dotenv').config(); // bring in the env file
const flowerShop = process.env.FLOWERSHOP; // .env
const io = require('socket.io-client');

// library that creates a mass amount of fake data 
const faker = require('faker'); 

// bring in the other dependencies 
const events = require('./event-pool'); 

if(false) {
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
}
/* 
Class 18
Vendor Application
    - Continue to declare your store id using .env
    - Connects to the CAPS server as a socket.io client to the caps namespace
    - Join a room named for your store
        - Emit a join event to the caps namespace connection, with the payload being your store code
    - Every .5 seconds, simulate a new customer order
        - Create a payload object with your store name, order id, customer name, address
        - Emit that message to the CAPS server with an event called pickup
    - Listen for the delivered event coming in from the CAPS server
        - Log “thank you for delivering payload.id” to the console
*/

const port = process.env.PORT;
const host = 'http://localhost:' + port + '/caps';

const capsConnection = io.connect(host);

capsConnection.emit('join', flowerShop);

setInterval(() => {

  let order = {
    storeName: flowerShop, 
    orderID: faker.random.uuid(), 
    customer: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),
  };

  capsConnection.emit('pickup', order);
}, 5000); 

// THANKING THE CUSTOMER: 
capsConnection.on('delivered', payload => thankYou(payload));


function thankYou(payload) {
  console.log('thank you for delivering ', payload.orderID);
}