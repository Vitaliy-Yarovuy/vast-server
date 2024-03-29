var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;


function InLine(id, settings) {
    BaseModel.call(this, id);
    this.settings = _.merge({
        AdSystem: "",
        version:null,
        AdTitle: "",
        Description: null,
        Survey: null
    }, settings);
    this.creatives = [];
    this.extensions = null;
}

utils.extend(InLine, BaseModel);
InLine.links = ["creatives","extensions"];
InLine.prototype.idPrefix = "inline_";

InLine.prototype.addCreative = function(creative){
    this.creatives.push(creative.getId ? creative.getId() : creative);
};

InLine.prototype.setExtensions = function(extensions){
    this.extensions = extensions.getId ? extensions.getId() : extensions;
};

exports.InLine = InLine;