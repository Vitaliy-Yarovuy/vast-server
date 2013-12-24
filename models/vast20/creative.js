var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./baseModel").BaseModel;


function Creative(id, settings){
    BaseModel.call(this, id);
    this.settings = _.merge({
        id: "",
        sequence: null,
        AdID: ""
    },settings);
    this.linear = null;
}

utils.extend(Creative, BaseModel);
Creative.links = ["linear"];
Creative.prototype.idPrefix = "creative_";


Creative.prototype.setLinear = function(linear){
    this.linear = linear.getId ? linear.getId() : linear;
};


exports.Creative = Creative;