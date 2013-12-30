var _ = require("lodash");
var utils = require("../../utils/utils");



function StatisticItem(req){
    this.data = {
        url: req.url,
        method: req.method,
        remoteAddress: req._remoteAddress,
        time: req._startTime,
        sessionID: req.sessionID
    };
    this.init();
}

StatisticItem.prototype.init = function(){

};


exports.StatisticItem = StatisticItem;