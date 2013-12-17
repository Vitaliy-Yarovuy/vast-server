var _ = require("lodash");


function Creative(settings){
    this.settings = _.merge({

    },settings);
    this.linear = null;
}

Creative.prototype.setLinear = function(linear){
    this.linear = linear;
};


exports.Creative = Creative;