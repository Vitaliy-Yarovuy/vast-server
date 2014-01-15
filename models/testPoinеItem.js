var vast20 = require("./vast20");
var BaseModel = require("./baseModel").BaseModel;
var utils = require("../utils/utils");
var vast20statistic = require("./vast20statistic");
var _ = require("lodash");



function TestPointItem(id, vast, settings){
    BaseModel.call(this,id);
    this.settings = _.merge({

    },settings);
    this.setVast(vast);
}
utils.extend(TestPointItem, BaseModel);
TestPointItem.links = ["vast","statistic"];
TestPointItem.prototype.idPrefix = "test_point_item_";

TestPointItem.prototype.setVast = function(vast){
    if(this.vast == vast ||  (vast.getId && this.vast == vast.getId() ) ){
        return ;
    }
    this.vast = vast.getId ? vast.getId() : vast;
    var statistic = new vast20statistic.VastStatistic(null, vast);
    this.statistic = statistic.getId();
};

TestPointItem.prototype.updateStatisticModel = function(){
    var statistic = vast20statistic.VastStatistic.collections[this.statistic];
    statistic.updatePoints();
};

exports.TestPointItem = TestPointItem;