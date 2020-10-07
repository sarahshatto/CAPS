// Vendor Module: 
// // Declare your store name (perhaps in a .env file, so that this module is re-usable)

// Every 5 seconds, simulate a new customer order:
// // Create a fake order, as in an object: storeName, orderID, customerName, address

// Emit a pickup event and attach the order as a payload
// // Use the faker library to make up fake info

// Monitor the system for events: 
// // Whenever the 'delivered' event occurs, log "thank you" to the console. 


'use strict';

require('dotenv').config(); // bring in the env file
const flowerShop = process.env.FLOWERSHOP; // .env

// bring in the event pool file 
const events = require('event-pool.js'); 
const faker = require('faker'); // library that creates a mass amount of fake data 
const caps = require('caps.js'); 
const driver = require('driver.js');

setInterval(() => {

  let order = {
    store: storeName, 
    orderID: faker.random.uuid(), 
    customer: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup', order);
}, 2000);

// module.exports = { pupil, arm, eyelid }

// setInterval(() => {
//   let brightness = Math.ceil(Math.random() * 100);
//   events.emit('light', { brightness })
// }, 2000)


// events.on('light', (payload) => {
//   console.log('light happened');
// });

// // TO TEST

// /*
// const body = require('body.js');
// describe('light', () => {
//   it('pupils dilate', () => {
//     let payload = { brightness: 75}
//     const result = pupil(payload);
//     expoect(result).toEqual('dilated');
//   })
// })
// */

