var _ = require("lodash");

function Linear(settings) {
    this.settings = _.merge({
        Duration: "",
        AdParameters: ""
    }, settings);
    this.videoClicks = null;
    this.mediaFiles = [];
    this.trackingEvents = null;
}

Linear.prototype.addMediaFile = function(mediaFile){
    this.mediaFiles.push(mediaFile);
};
Linear.prototype.setVideoClicks = function(videoClicks){
    this.videoClicks = videoClicks;
};
Linear.prototype.setTrackingEvents = function(trackingEvents){
    this.trackingEvents = trackingEvents;
};

exports.Linear = Linear;