var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;

function Wrapper(id, settings) {
    BaseModel.call(this, id);
    this.settings = _.merge({
        AdSystem: "",
        version:null
    }, settings);
    this.innerVast = null;
    this.creatives = [];
    this.extensions = null;
}

utils.extend(Wrapper, BaseModel);
Wrapper.links = ["innerVast","creatives","extensions"];
Wrapper.prototype.idPrefix = "wrapper_";


Wrapper.prototype.addCreative = function(creative){
    this.creatives.push(creative.getId ? creative.getId() : creative);
};

Wrapper.prototype.setExtensions = function(extensions){
    this.extensions = extensions.getId ? extensions.getId() : extensions;
};

Wrapper.prototype.setInnerVast = function(vast){
    this.innerVast = vast.getId ? vast.getId() : vast;
};

exports.Wrapper = Wrapper;