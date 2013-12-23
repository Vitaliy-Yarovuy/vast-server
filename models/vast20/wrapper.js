var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./baseModel").BaseModel;

function Wrapper(settings) {
    BaseModel.call(this);
    this.settings = _.merge({
        AdSystem: ""
    }, settings);
    this.innerVast = null;
    this.creatives = [];
    this.extensions = [];
}

utils.extend(Wrapper, BaseModel);
Wrapper.links = ["innerVast","creatives","extensions"];
Wrapper.prototype.idPrefix = "wrapper_";


Wrapper.prototype.addCreative = function(creative){
    this.creatives.push(creative.getId ? creative.getId() : creative);
};

Wrapper.prototype.addExtension = function(extension){
    this.extensions.push(extension.getId ? extension.getId() : extension);
};


Wrapper.prototype.setInnerVast = function(vast){
    this.innerVast = vast.getId ? vast.getId() : vast;
};

exports.Wrapper = Wrapper;