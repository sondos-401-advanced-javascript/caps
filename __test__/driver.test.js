'use strict';

// var sinon = require('sinon');
let events = require('../events');
jest.useFakeTimers();
jest.spyOn(global.console, 'log');



describe('EventEmitter', ()=>{
  it('should call order to start packup', ()=>{
    require('../driver');
    events.emit('pickup',{orderID:'55555'});
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(console.log).toHaveBeenCalled();
  });

  it('should call order to start in-transint', ()=>{
    require('../driver');
    events.emit('in-transit',{orderID:'55555'});
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    expect(console.log).toHaveBeenCalled();
  });

  it('should call order to start packup', ()=>{
    require('../driver');
    events.emit('delivered',{orderID:'55555'});
    expect(console.log).toHaveBeenCalled();
  });

});