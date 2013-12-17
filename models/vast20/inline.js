var _ = require("lodash");



function InLine(settings) {
    this.settings = _.merge({
        AdSystem: "",
        version:null,
        AdTitle: "",
        Description: null,
        Survey: null
    }, settings);
    this.creatives = [];
    this.extensions = [];
}

InLine.prototype.addCreative = function(creative){
    this.creatives.push(creative);
};

InLine.prototype.addExtension = function(extension){
    this.extensions.push(extension);
};

exports.InLine = InLine;