var _ = require("lodash");

function Linear(settings) {
    this.settings = _.merge({
        Duration: "",
        AdParameters: ""
    }, settings);
    this.videoClicks = null;
    this.mediaFiles = [];
    this.TrackingEvents = [];
}

Linear.prototype.addMediaFile = function(mediaFile){
    this.mediaFiles.push(mediaFile);
};
Linear.prototype.setVideoClicks = function(videoClicks){
    this.videoClicks = videoClicks;
};
Linear.prototype.addTracking = function(tracking){
    this.TrackingEvents.push(tracking);
};

exports.Linear = Linear;