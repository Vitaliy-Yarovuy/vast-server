var testPointContainer = require('../models/testPointContainer').testPointContainer;

var index = function(socket){
    socket.on('list:get', function (data,fn) {
        fn({
            list: testPointContainer.getAllPoint().map(function(point){
                return point.toJSON();
            })
        });
    });
    testPointContainer.on("add",function(testPoint){
        socket.emit("list:add",{
            item: testPoint.toJSON()
        })
    });
};

exports.index = index;