var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;

function VideoClicks(id, settings) {
    BaseModel.call(this, id);
    this.settings = _.merge({
        ClickThrough: true,
        ClickTracking: true,
        CustomClick: true
    }, settings);
}

utils.extend(VideoClicks, BaseModel);
VideoClicks.links = [];
VideoClicks.prototype.idPrefix = "videoclicks_";


exports.VideoClicks = VideoClicks;