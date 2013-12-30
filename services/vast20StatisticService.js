var utils = require("../utils/utils");
var _ = require("lodash");
var vast20statistic = require("../models/vast20statistic");
var serviceFactory = require("./serviceFactory").serviceFactory;


var vast20StatisticService = serviceFactory.build(vast20statistic.VastStatistic);

vast20StatisticService.clear = function(id){
    var callback = arguments[arguments.length-1];
    var model = vast20statistic.VastStatistic.collections[id];
    model.clear();
    callback(null, model);
    this.emit("updated", model);
};

exports.vast20StatisticService = vast20StatisticService;