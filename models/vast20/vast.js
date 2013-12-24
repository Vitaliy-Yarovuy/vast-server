var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./baseModel").BaseModel;


function Vast(id, settings){
    BaseModel.call(this,id);
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
    this.inLine = inLine.getId ? inLine.getId() : inLine;
};

Vast.prototype.setWrapper = function(wrapper){
    this.wrapper = wrapper.getId ? wrapper.getId() : wrapper;
};



exports.Vast = Vast;