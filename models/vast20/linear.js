var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;

function Linear(id, settings) {
    BaseModel.call(this, id);
    this.settings = _.merge({
        Duration: "",
        AdParameters: ""
    }, settings);
    this.videoClicks = null;
    this.mediaFiles = [];
    this.trackingEvents = null;
}

utils.extend(Linear, BaseModel);
Linear.links = ["videoClicks","mediaFiles","trackingEvents"];
Linear.prototype.idPrefix = "linear_";


Linear.prototype.addMediaFile = function(mediaFile){
    this.mediaFiles.push(mediaFile.getId ? mediaFile.getId() : mediaFile);
};
Linear.prototype.setVideoClicks = function(videoClicks){
    this.videoClicks = videoClicks.getId ? videoClicks.getId() : videoClicks;
};
Linear.prototype.setTrackingEvents = function(trackingEvents){
    this.trackingEvents = trackingEvents.getId ? trackingEvents.getId() : trackingEvents;
};

exports.Linear = Linear;