var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;



function StatisticPoint(key){
    this.key = key;
    this.items = [];
}

StatisticPoint.prototype.track = function(data){
    this.items.push(data);
};

StatisticPoint.prototype.clear = function(){
    this.items = [];
};

exports.StatisticPoint = StatisticPoint;