var vast20 = require("./vast20");


function TestPoint(id){
    this.id = id;
}

TestPoint.prototype.toJSON = function(){
    return {
        id: this.id
    };
};



exports.TestPoint = TestPoint;