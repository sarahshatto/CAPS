'use strict'; 

// brings in the singleton ! 
const events = require('./event-pool');
const driver = require('./driver');
const port = process.env.PORT;
const io = require('socket.io')(port); 

if(false) {
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
}
/*
Class 18
CAPS Application Server Modifications
- Start a socket.io server on a designated port
- Create and accept connections on a namespace called caps
- Within the namespace:
    - Monitor the ‘join’ event.
        - Each vendor will have their own “room” so that they only get their own delivery notifications
    - Monitor the correct general events
        - pickup, in-transit, delivered
        - Broadcast the events and payload back out to the appropriate clients in the caps namespace
            - pickup can go out to all sockets (broadcast it) so that the drivers can hear it
            - in-transit and delivered are meant to be heard only by the right vendor
                - Emit those messages and payload only to the room (vendor) for which the message was intended
*/

const caps = io.of('/caps');

caps.on('connection', (socket) => {

    socket.on('join', (room) => {
        //console.log("join ${room}");
        socket.join(room);
    });

    socket.on('pickup', (payload) => {
        caps.emit('pickup', payload);
    });

    socket.on('in-transit', (payload) => {
        //console.log("CAPS: in-transit : " +  payload.storeName);
        caps.to(payload.storeName).emit('in-transit', payload);
    });

    socket.on('delivered', (payload) => {
        //console.log("CAPS: delivered : " +  payload.storeName);
        caps.to(payload.storeName).emit('delivered', payload);
    });
});
// .on() subscribes you to a single event , listener - passing in the name of the event you want to subsribe to, second item is the function that gets called when that event is received (payload => logger) 

