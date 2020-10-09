'use strict'; 

// brings in the singleton ! 
const events = require('./event-pool');
const driver = require('./driver');

// PICKUP: 
events.on('pickup', payload => logger('pickup', payload));

// IN-TRANSIT: 
events.on('in-transit', payload => logger('in-transit', payload));

// DELIVERED: 
events.on('delivered', payload => logger('delivered', payload));

// LOGGER FUNCTION: 
function logger(eventName, payloadData) {
  let time = new Date();
  console.log('EVENT', { eventName, time, payloadData });
}

// caps.js is the main hub application

// // manages the state of every package 
// [ ] ( RFP, In Transit, Delivered, etc..)
// [ ]  Logs every event to the console with a timestamp and the event payload ... i.e. "EVENT {}"

////////////////////////////////////////////////////////////////////////////////////////////////


// .on() subscribes you to a single event , listener - passing in the name of the event you want to subsribe to, second item is the function that gets called when that event is received (payload => logger) 

