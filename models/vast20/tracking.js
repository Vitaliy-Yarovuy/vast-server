var _ = require("lodash");

function Tracking(settings) {
    this.settings = _.merge({
        type: null
    }, settings);
}

Tracking.type = [
    "creativeView",
    "start",
    "midpoint",
    "firstQuartile",
    "thirdQuartile",
    "complete",
    "mute",
    "unmute",
    "pause",
    "rewind",
    "resume",
    "fullscreen",
    "expand",
    "collapse",
    "acceptInvitation",
    "close"
];

Tracking.trackAll = function(){
    return Tracking.type.map(function(type){
        return new Tracking({
            type: type
        });
    });
};

exports.Tracking = Tracking;
