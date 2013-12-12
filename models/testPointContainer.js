var TestPoint = require('./testPoint').TestPoint;
var util = require("util");
var EventEmitter = require('events').EventEmitter;


function TestPointContainer(){
    EventEmitter.call(this);
    this.testPoints = {};
}
util.inherits(TestPointContainer, EventEmitter);


TestPointContainer.prototype.hasPoint = function(id){
    return !!this.testPoints[id];
};

TestPointContainer.prototype.createPoint = function(id){
    this.testPoints[id] = new TestPoint(id);
    this.emit("add",this.testPoints[id]);
};

TestPointContainer.prototype.getPoint = function(id){
    if(!this.hasPoint(id)){
        this.createPoint(id);
    }
    return this.testPoints[id];
};

TestPointContainer.prototype.getAllPoint = function(){
    var list = [];
    for(var key in this.testPoints){
        if(this.testPoints.hasOwnProperty(key)){
            list.push(this.testPoints[key]);
        }
    }
    return list;
};


exports.testPointContainer = new TestPointContainer();

exports.testPointContainer.getPoint("one");
exports.testPointContainer.getPoint("two");
exports.testPointContainer.getPoint("three");