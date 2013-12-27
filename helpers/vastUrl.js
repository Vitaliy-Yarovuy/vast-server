var _ = require("lodash");
var video = require('../models/video');
var vast20 = require("../models/vast20");
var vast20statistic = require("../models/vast20statistic");

var vastUrlHelper = {
    host: "/",
    setHost: function(host){
        this.host = host;
    },
    getVastEventUrl: function(point, vast, event){
        return this.host + "/point/"+point.id+"/statistic/"+vast.id+"/event/"+event;
    },
    getCreativeTrackingEventUrl: function(point, vast, creative, event){
        return this.host + "/point/"+point.id+"/statistic/"+vast.id+"/creative/"+creative.id+"/tracking_event/"+event;
    },
    getCreativeClickEventUrl: function(point, vast, creative, event){
        return this.host + "/point/"+point.id+"/statistic/"+vast.id+"/creative/"+creative.id+"/click_event/"+event;
    }
};

exports.vastUrlHelper = vastUrlHelper;
