var _ = require("lodash");

function Linear(settings) {
    this.settings = _.merge({
        Duration: "",
        AdParameters: ""
    }, settings);
    this.videoClicks = null;
    this.mediaFiles = [];
}

Linear.prototype.addMediaFile = function(mediaFile){
    this.mediaFiles.push(mediaFile);
};

Linear.prototype.addMediaFile = function(videoClicks){
    this.videoClicks = videoClicks;
};

exports.Linear = Linear;