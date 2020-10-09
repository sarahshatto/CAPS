'use strict'; 

// Bring in the singleton!
const events = require('./event-pool');

// Listen for the pickup event, run the pickup function, passing in the payload! 
events.on('pickup', payload => pickup(payload));

// Pickup function takes in a payload, setTimeout delays... 
function pickup(payload){
  setTimeout(driver, 1000, payload); 
  setTimeout(delivered, 3000, payload);
}

// Driver function takes in payload, sends out a console log, and sends via .emit the "in-transit" event
function driver(payload){
  let orderid = payload.orderID; 
  console.log('FROM THE DRIVER: picked up', orderid);
  events.emit('in-transit', payload);
}

// Delivered function takes in a payload, grabs the orderID from the order object, logs in the console with the order ID, and then sends out via .emit() the delivered event with the order information. 
function delivered(payload){
  let orderid = payload.orderID;
  console.log('FROM THE DRIVER: delivered!', orderid);
  events.emit('delivered', payload);
}

// Drivers Module: 

//  [ ] Monitor the system for events: 
//  //  [ ] pickup event: 
//  //  //  [ ] wait 1 second: 
//  //  //  //  [ ] Log: "DRIVER: picked up [ORDER_ID]" to the console. 
//  //  //  //  [ ] Emit an 'in-transit' event with the payload you received.


//  //  //  [ ] wait 3 seconds: 
//  //  //  //  [ ] Log "delivered" to the console. 
//  //  //  //  [ ] Emit a 'delivered' event with the same payload


