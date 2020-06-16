'use strict';

var sinon = require('sinon');
let events = require('../events');
// const { setInterval } = require('timers');
jest.useFakeTimers();
jest.spyOn(global.console, 'log');



describe('EventEmitter',()=>{
  it('should invoke the callback', ()=>{
    require('../vendor');
    var spy = sinon.spy();
    events.on('order', spy);
    events.emit('order');
    expect(spy.called).toBeTruthy();
  });

  it('should call order to start packup',()=>{
    let spy = sinon.spy();
    require('../vendor');
    require('../driver');
    events.emit('order');
    expect(spy.call).toBeTruthy(); 
    expect(setInterval).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

});