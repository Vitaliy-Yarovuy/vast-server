var _ = require("lodash");


function Wrapper(settings) {
    this.settings = _.merge({
        AdSystem: ""
    }, settings);
    this.innerVast = null;
    this.creatives = [];
    this.extensions = [];
}

Wrapper.prototype.addCreative = function(creative){
    this.creatives.push(creative);
};

Wrapper.prototype.addExtension = function(extension){
    this.extensions.push(extension);
};



Wrapper.prototype.setInnerVast = function(vast){
    this.innerVast = vast;
};

exports.Wrapper = Wrapper;