var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./baseModel").BaseModel;

function TrackingEvents(id, settings) {
    BaseModel.call(this, id);
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

utils.extend(TrackingEvents, BaseModel);
TrackingEvents.links = [];
TrackingEvents.prototype.idPrefix = "trackingevents_";

exports.TrackingEvents = TrackingEvents;
