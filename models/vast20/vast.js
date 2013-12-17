var _ = require("lodash");


function Vast(settings){
    this.settings = _.merge({

    },settings);
    this.inLine = null;
    this.wrapper = null;
}

Vast.prototype.setInLine = function(inLine){
    this.inLine = inLine;
};

Vast.prototype.setWrapper = function(wrapper){
    this.wrapper = wrapper;
};


exports.Vast = Vast;