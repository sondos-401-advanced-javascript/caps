'use strict';

var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
require('../caps');


describe('EventEmitter', ()=>{
 
  it('connect with another', ()=>{
    var spy = sinon.spy();
    var emitter = new EventEmitter;
    emitter.on('order', spy);
    emitter.emit('order');
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy);
  });

});