var _ = require("lodash");

function VideoClicks(settings) {
    this.settings = _.merge({
        ClickThrough: true,
        ClickTracking: true,
        CustomClick: true
    }, settings);
}

exports.VideoClicks = VideoClicks;