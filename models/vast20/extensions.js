var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;

function Extensions(id, settings) {
    BaseModel.call(this, id);
    this.settings = _.merge({
        startTime: 0,
        skipTime: 0,
        skipTime2: 0,
        linkTxt: "",
        isClickable: true,
        skipAd: true,
        addClick: true,
        controls: null
    }, settings);
}

utils.extend(Extensions, BaseModel);
Extensions.links = [];
Extensions.prototype.idPrefix = "extensions_";


exports.Extensions = Extensions;