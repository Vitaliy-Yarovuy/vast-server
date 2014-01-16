var _ = require("lodash");
var printf = require('printf');

var timeHelper = {
    secToHumanReadable: function (sec) {
        sec = sec || 0;
        return printf("%02d:%02d", parseInt(sec/60), sec%60);
    }
};

exports.timeHelper = timeHelper;
