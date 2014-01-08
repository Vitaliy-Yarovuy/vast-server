var _ = require("lodash");
var video = require('../models/video');
var vast20 = require("../models/vast20");
var vast20statistic = require("../models/vast20statistic");

var vastUrlHelper = {
    host: "/",
    setHost: function (host) {
        this.host = host;
    },
    getVastUrl: function (point, vast) {
        if(!point || !vast){
            return this.host + "404.html";
        }
        return this.host + "point/" + point.id + "/vast/" + vast.id + "/vast.xml";
    },
    getVastEventUrl: function (point, vast, event) {
        if(!point || !vast || !event){
            return this.host + "404.html";
        }
        return this.host + "point/" + point.id + "/statistic/" + vast.id + "/event/" + event;
    },
    getCreativeTrackingEventUrl: function (point, vast, creative, event) {
        if(!point || !vast || !event || !creative){
           return this.host + "404.html";
        }
        return this.host + "point/" + point.id + "/statistic/" + vast.id + "/creative/" + creative.id + "/tracking_event/" + event;

    },
    getCreativeClickEventUrl: function (point, vast, creative, event) {
        if(!point || !vast || !event || !creative){
            return this.host + "404.html";
        }
        return this.host + "point/" + point.id + "/statistic/" + vast.id + "/creative/" + creative.id + "/click_event/" + event;
    }
};

exports.vastUrlHelper = vastUrlHelper;
