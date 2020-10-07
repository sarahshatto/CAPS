// caps.js is the main hub application
// // manages the state of every package ( RFP, In Transit, Delivered, etc..)
// // Logs every event to the console with a timestamp and the event payload
// // i.e. "EVENT {}"

'use strict'; 

const events = require('event-pool.js');
const driver = require('driver.js');

// PICKUP: 
events.on('pickup', payload => logger('pickup', payload));

// IN-TRANSIT: 
events.on('in-transit', payload => logger('in-transit', payload));

// THANKING THE CUSTOMER: 
events.on('delivered', payload => thankYou('delivered', payload));

// DELIVERED: 
events.on('delivered', payload => logger('delivered', payload));


function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}

function thankYou(event, payload) {
  console.log('FROM THE VENDOR: Thank you!', payload.orderID);
}