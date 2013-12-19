var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./baseModel").BaseModel;


function Vast(settings){
    BaseModel.call(this);
    this.settings = _.merge({
        id: null
    },settings);
    this.inLine = null;
    this.wrapper = null;
}

utils.extend(Vast, BaseModel);

Vast.links = ["inLine","wrapper"];

Vast.prototype.idPrefix = "vast_";

Vast.prototype.setInLine = function(inLine){
    if(inLine.getId){
        this.inLine = inLine.getId();
    }
};

Vast.prototype.setWrapper = function(wrapper){
    if(wrapper.getId){
        this.wrapper = wrapper.getId();
    }
};



exports.Vast = Vast;