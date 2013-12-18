var _ = require("lodash");

function TrackingEvents(settings) {
    this.settings = _.merge({
        creativeView: true,
        start: true,
        midpoint: true,
        firstQuartile: true,
        thirdQuartile: true,
        complete: true,
        mute: true,
        unmute: true,
        pause: true,
        rewind: true,
        resume: true,
        fullscreen: true,
        expand: true,
        collapse: true,
        acceptInvitation: true,
        close: true
    }, settings);
}

exports.TrackingEvents = TrackingEvents;
