// global event pool: 

'use strict';

const events = require('events');
const eventEmitter = new events.EventEmitter();

// Exporting a single instance (singleton) of the events class- so that all of the files can access it. 

module.exports = eventEmitter;

// singleton: a design pattern. You can define a single instance of a class that gets reused everywhere. Now, every other class can access your singleton and be able to utilize the same end point or the same data. 

// events in js  - emit and subscribe 