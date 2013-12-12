var testPointContainer = require('../models/testPointContainer').testPointContainer;

var point = function(socket){
    socket.on('point:get',function (data,fn) {
        fn({
            point: testPointContainer.getPoint(data.id).toJSON()
        });
    });
};

exports.point = point;