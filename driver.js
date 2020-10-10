'use strict'; 

// Bring in the singleton!
const events = require('./event-pool');
const io = require('socket.io-client');
require('dotenv').config();

if(false) {
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
}

/*
Class 18
Driver Application
    - Connects to the CAPS server as a socket.io client to the caps namespace
    - Listen for the pickup event coming in from the CAPS server
        - Simulate picking up the package
            - Wait 1.5 seconds
            - Log “picking up payload.id” to the console
            - emit an in-transit event to the CAPS server with the payload
        - Simulate delivering the package
            - Wait 3 seconds
            - emit a delivered event to the CAPS server with the payload
*/

const port = process.env.PORT;
const host = 'http://localhost:' + port + '/caps';

const capsConnection = io.connect(host);

capsConnection.on('pickup', (payload) => {
  setTimeout(driverSocket, 1500, payload); // wait 1.5 seconds >> driverSocket
  setTimeout(deliveredSocket, 3000, payload); // wait 3 seconds >> deliveredrSocket
});

// Driver function takes in payload, sends out a console log, and sends via .emit the "in-transit" event
function driverSocket(payload){
  let orderid = payload.orderID; 
  console.log('picking up ', orderid); // log pickup
  capsConnection.emit('in-transit', payload); // emit in transit event 
}

// Delivered function takes in a payload, grabs the orderID from the order object, logs in the console with the order ID, and then sends out via .emit() the delivered event with the order information. 
function deliveredSocket(payload){
  let orderid = payload.orderID;
  capsConnection.emit('delivered', payload);
}
