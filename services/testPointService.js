var TestPoint = require('../models/testPoint').TestPoint;
var util = require("util");


function TestPointService() {
    this.testPoints = {};
}

TestPointService.prototype.create = function (data) {
    var callback = arguments[arguments.length-1];
    var id = data.id, point = new TestPoint(id);
    this.testPoints[id] = point;
    callback(null, point);
};


TestPointService.prototype.get = function (id) {
    var callback = arguments[arguments.length-1];
    if (!this.testPoints[id]) {
        this.create({id:id},function(){});
    }
    callback(null, this.testPoints[id]);
};

TestPointService.prototype.find = function (params) {
    var callback = arguments[arguments.length-1];
    var list = [];
    for(var key in this.testPoints){
        if(this.testPoints.hasOwnProperty(key)){
            list.push(this.testPoints[key]);
        }
    }
    callback(null, list);
};


exports.testPointService = new TestPointService();

exports.testPointService.get("one",function(){});
exports.testPointService.get("two",function(){});
exports.testPointService.get("three",function(){});